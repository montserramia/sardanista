<?php

namespace Drupal\workspaces\Entity;

use Drupal\Core\Entity\Attribute\ContentEntityType;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Entity\Routing\AdminHtmlRouteProvider;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\user\EntityOwnerTrait;
use Drupal\views\EntityViewsData;
use Drupal\workspaces\Entity\Handler\IgnoredWorkspaceHandler;
use Drupal\workspaces\Form\WorkspaceActivateForm;
use Drupal\workspaces\Form\WorkspaceDeleteForm;
use Drupal\workspaces\Form\WorkspaceForm;
use Drupal\workspaces\WorkspaceAccessControlHandler;
use Drupal\workspaces\WorkspaceInterface;
use Drupal\workspaces\WorkspaceListBuilder;
use Drupal\workspaces\WorkspaceViewBuilder;

/**
 * The workspace entity class.
 */
#[ContentEntityType(
  id: 'workspace',
  label: new TranslatableMarkup('Workspace'),
  label_collection: new TranslatableMarkup('Workspaces'),
  label_singular: new TranslatableMarkup('workspace'),
  label_plural: new TranslatableMarkup('workspaces'),
  entity_keys: [
    'id' => 'id',
    'revision' => 'revision_id',
    'uuid' => 'uuid',
    'label' => 'label',
    'uid' => 'uid',
    'owner' => 'uid',
  ],
  handlers: [
    'list_builder' => WorkspaceListBuilder::class,
    'view_builder' => WorkspaceViewBuilder::class,
    'access' => WorkspaceAccessControlHandler::class,
    'views_data' => EntityViewsData::class,
    'route_provider' => [
      'html' => AdminHtmlRouteProvider::class,
    ],
    'form' => [
      'default' => WorkspaceForm::class,
      'add' => WorkspaceForm::class,
      'edit' => WorkspaceForm::class,
      'delete' => WorkspaceDeleteForm::class,
      'activate' => WorkspaceActivateForm::class,
    ],
    'workspace' => IgnoredWorkspaceHandler::class,
  ],
  links: [
    'canonical' => '/admin/config/workflow/workspaces/manage/{workspace}',
    'add-form' => '/admin/config/workflow/workspaces/add',
    'edit-form' => '/admin/config/workflow/workspaces/manage/{workspace}/edit',
    'delete-form' => '/admin/config/workflow/workspaces/manage/{workspace}/delete',
    'activate-form' => '/admin/config/workflow/workspaces/manage/{workspace}/activate',
    'collection' => '/admin/config/workflow/workspaces',
  ],
  admin_permission: 'administer workspaces',
  base_table: 'workspace',
  data_table: 'workspace_field_data',
  revision_table: 'workspace_revision',
  revision_data_table: 'workspace_field_revision',
  label_count: [
    'singular' => '@count workspace',
    'plural' => '@count workspaces',
  ],
  field_ui_base_route: 'entity.workspace.collection',
)]
class Workspace extends ContentEntityBase implements WorkspaceInterface {

  use EntityChangedTrait;
  use EntityOwnerTrait;

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = parent::baseFieldDefinitions($entity_type);
    $fields += static::ownerBaseFieldDefinitions($entity_type);

    $fields['id'] = BaseFieldDefinition::create('string')
      ->setLabel(new TranslatableMarkup('Workspace ID'))
      ->setDescription(new TranslatableMarkup('The workspace ID.'))
      ->setSetting('max_length', 128)
      ->setRequired(TRUE)
      ->addConstraint('UniqueField')
      ->addConstraint('DeletedWorkspace')
      ->addPropertyConstraints('value', ['Regex' => ['pattern' => '/^[a-z0-9_]+$/']]);

    $fields['label'] = BaseFieldDefinition::create('string')
      ->setLabel(new TranslatableMarkup('Workspace name'))
      ->setDescription(new TranslatableMarkup('The workspace name.'))
      ->setRevisionable(TRUE)
      ->setSetting('max_length', 128)
      ->setRequired(TRUE);

    $fields['uid']
      ->setLabel(new TranslatableMarkup('Owner'))
      ->setDescription(new TranslatableMarkup('The workspace owner.'))
      ->setDisplayOptions('form', [
        'type' => 'entity_reference_autocomplete',
        'weight' => 5,
      ])
      ->setDisplayConfigurable('form', TRUE);

    $fields['parent'] = BaseFieldDefinition::create('entity_reference')
      ->setLabel(new TranslatableMarkup('Parent'))
      ->setDescription(new TranslatableMarkup('The parent workspace.'))
      ->setSetting('target_type', 'workspace')
      ->setReadOnly(TRUE)
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayOptions('form', [
        'type' => 'options_select',
        'weight' => 10,
      ]);

    $fields['changed'] = BaseFieldDefinition::create('changed')
      ->setLabel(new TranslatableMarkup('Changed'))
      ->setDescription(new TranslatableMarkup('The time that the workspace was last edited.'))
      ->setRevisionable(TRUE);

    $fields['created'] = BaseFieldDefinition::create('created')
      ->setLabel(new TranslatableMarkup('Created'))
      ->setDescription(new TranslatableMarkup('The time that the workspace was created.'));

    return $fields;
  }

  /**
   * {@inheritdoc}
   */
  public function publish() {
    return \Drupal::service('workspaces.operation_factory')->getPublisher($this)->publish();
  }

  /**
   * {@inheritdoc}
   */
  public function getCreatedTime() {
    return $this->get('created')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setCreatedTime($created) {
    return $this->set('created', (int) $created);
  }

  /**
   * {@inheritdoc}
   */
  public function hasParent() {
    return !$this->get('parent')->isEmpty();
  }

  /**
   * {@inheritdoc}
   */
  public static function preDelete(EntityStorageInterface $storage, array $entities) {
    parent::preDelete($storage, $entities);

    $workspace_tree = \Drupal::service('workspaces.repository')->loadTree();

    // Ensure that workspaces that have descendants can not be deleted.
    foreach ($entities as $entity) {
      if (!empty($workspace_tree[$entity->id()]['descendants'])) {
        throw new \InvalidArgumentException("The {$entity->label()} workspace can not be deleted because it has child workspaces.");
      }
    }
  }

  /**
   * {@inheritdoc}
   */
  public static function postDelete(EntityStorageInterface $storage, array $entities) {
    parent::postDelete($storage, $entities);

    /** @var \Drupal\workspaces\WorkspaceManagerInterface $workspace_manager */
    $workspace_manager = \Drupal::service('workspaces.manager');
    // Disable the currently active workspace if it has been deleted.
    if ($workspace_manager->hasActiveWorkspace()
      && in_array($workspace_manager->getActiveWorkspace()->id(), array_keys($entities), TRUE)) {
      $workspace_manager->switchToLive();
    }

    // Ensure that workspace batch purging does not happen inside a workspace.
    $workspace_manager->executeOutsideWorkspace(function () use ($workspace_manager, $entities) {
      // Add the IDs of the deleted workspaces to the list of workspaces that will
      // be purged on cron.
      $state = \Drupal::state();
      $deleted_workspace_ids = $state->get('workspace.deleted', []);
      $deleted_workspace_ids += array_combine(array_keys($entities), array_keys($entities));
      $state->set('workspace.deleted', $deleted_workspace_ids);

      // Trigger a batch purge to allow empty workspaces to be deleted
      // immediately.
      $workspace_manager->purgeDeletedWorkspacesBatch();
    });
  }

}
