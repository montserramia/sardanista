<?php

namespace Drupal\sardanista_forms\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\contact\Entity\Message;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Controller for form submissions.
 */
class FormsController extends ControllerBase {

  /**
   * Handle CORS preflight requests.
   */
  protected function corsHeaders() {
    return [
      'Access-Control-Allow-Origin' => '*',
      'Access-Control-Allow-Methods' => 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
    ];
  }

  /**
   * Handle contact form submission.
   */
  public function contact(Request $request) {
    // Handle OPTIONS request for CORS
    if ($request->getMethod() === 'OPTIONS') {
      return new JsonResponse(null, 200, $this->corsHeaders());
    }

    try {
      $data = json_decode($request->getContent(), TRUE);
      
      if (empty($data['nom']) || empty($data['email']) || empty($data['missatge'])) {
        return new JsonResponse(
          ['error' => 'Missing required fields'],
          400,
          $this->corsHeaders()
        );
      }

      // Validate email
      if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        return new JsonResponse(
          ['error' => 'Invalid email address'],
          400,
          $this->corsHeaders()
        );
      }

      // Create contact message
      $message = Message::create([
        'contact_form' => 'feedback',
        'name' => $data['nom'],
        'mail' => $data['email'],
        'subject' => 'Contacte des de sardanista.cat',
        'message' => $data['missatge'],
      ]);
      $message->save();

      // Log the submission
      \Drupal::logger('sardanista_forms')->info(
        'Contact form submitted: @name (@email)',
        ['@name' => $data['nom'], '@email' => $data['email']]
      );

      return new JsonResponse(
        ['message' => 'Form submitted successfully', 'id' => $message->id()],
        200,
        $this->corsHeaders()
      );
    }
    catch (\Exception $e) {
      \Drupal::logger('sardanista_forms')->error('Error processing contact form: @error', ['@error' => $e->getMessage()]);
      
      return new JsonResponse(
        ['error' => 'Error processing form'],
        500,
        $this->corsHeaders()
      );
    }
  }

  /**
   * Handle newsletter subscription.
   */
  public function newsletter(Request $request) {
    // Handle OPTIONS request for CORS
    if ($request->getMethod() === 'OPTIONS') {
      return new JsonResponse(null, 200, $this->corsHeaders());
    }

    try {
      $data = json_decode($request->getContent(), TRUE);
      
      if (empty($data['email'])) {
        return new JsonResponse(
          ['error' => 'Email is required'],
          400,
          $this->corsHeaders()
        );
      }

      // Validate email
      if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        return new JsonResponse(
          ['error' => 'Invalid email address'],
          400,
          $this->corsHeaders()
        );
      }

      // Create newsletter subscription
      $message = Message::create([
        'contact_form' => 'feedback',
        'name' => 'Newsletter Subscription',
        'mail' => $data['email'],
        'subject' => 'Subscripció newsletter sardanista.cat',
        'message' => 'Nova subscripció al butlletí de notícies.',
      ]);
      $message->save();

      // Log the submission
      \Drupal::logger('sardanista_forms')->info(
        'Newsletter subscription: @email',
        ['@email' => $data['email']]
      );

      return new JsonResponse(
        ['message' => 'Subscription successful', 'id' => $message->id()],
        200,
        $this->corsHeaders()
      );
    }
    catch (\Exception $e) {
      \Drupal::logger('sardanista_forms')->error('Error processing newsletter: @error', ['@error' => $e->getMessage()]);
      
      return new JsonResponse(
        ['error' => 'Error processing subscription'],
        500,
        $this->corsHeaders()
      );
    }
  }

}
