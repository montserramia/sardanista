import React from "react";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";
import bgImage from "assets/images/sardana/db/mans.jpeg";
import PropTypes from "prop-types";

const legalContent = {
  terms: {
    title: "Termes i Condicions",
    content: `
      <h2>Termes i Condicions d'Ús</h2>
      <p><strong>Data d'entrada en vigor:</strong> 15/03/2026</p>
      <p>Benvingut/uda al lloc web del <strong>Grup Sardanista Castelldefels</strong>. En accedir i utilitzar aquest lloc web, accepteu complir els següents termes i condicions. Si no hi esteu d'acord, us demanem que no utilitzeu el nostre lloc web.</p>
      
      <h3>1. Informació general</h3>
      <p>Aquest lloc web és propietat del <strong>Grup Sardanista Castelldefels</strong> (d'ara endavant, "l'Associació"), entitat cultural sense ànim de lucre dedicada a la promoció de la sardana i la cultura popular a Castelldefels.</p>
      
      <h3>2. Ús del lloc web</h3>
      <p>L'usuari es compromet a utilitzar el lloc web de manera lícita, respectant la legislació vigent, la moral, l'ordre públic i els drets de tercers. Queda prohibit qualsevol ús que pugui danyar, inutilitzar o saturar el lloc web o que interfereixi en l'ús d'altres usuaris.</p>
      
      <h3>3. Continguts i propietat intel·lectual</h3>
      <p>Els continguts d'aquest lloc web (textos, imatges, logotips, disseny, etc.) són propietat de l'Associació o dels seus llicenciants i estan protegits per la legislació de propietat intel·lectual. No es permet la reproducció, distribució o modificació sense autorització prèvia per escrit, llevat de l'ús personal i no comercial.</p>
      
      <h3>4. Registre i dades personals</h3>
      <p>Per accedir a determinats serveis (com ara inscripcions, butlletins o àrea de socis), pot ser necessari registrar-se i facilitar dades personals. L'usuari garanteix que les dades proporcionades són veraces i actualitzades. El tractament d'aquestes dades es regeix per la nostra <a href="/legal/privacy?type=privacy">Política de Privacitat</a>.</p>
      
      <h3>5. Enllaços a tercers</h3>
      <p>El nostre lloc web pot contenir enllaços a pàgines externes. No ens fem responsables del contingut ni de les pràctiques de privacitat d'aquests llocs. Us recomanem llegir les seves polítiques abans d'utilitzar-los.</p>
      
      <h3>6. Limitació de responsabilitat</h3>
      <p>L'Associació no es responsabilitza dels danys derivats de:</p>
      <ul>
        <li>Interrupcions en el funcionament del lloc web per causes tècniques o de manteniment.</li>
        <li>Errors o omissions en els continguts.</li>
        <li>Ús inadequat del lloc web per part de l'usuari.</li>
        <li>Virus o programes maliciosos que puguin accedir al sistema de l'usuari a través del lloc web, malgrat les mesures de seguretat adoptades.</li>
      </ul>
      
      <h3>7. Modificacions</h3>
      <p>Ens reservem el dret de modificar aquests termes i condicions en qualsevol moment. Els canvis entraran en vigor des de la seva publicació en aquesta pàgina. Us recomanem revisar-los periòdicament.</p>
      
      <h3>8. Legislació aplicable i jurisdicció</h3>
      <p>Aquests termes es regeixen per la legislació espanyola. Per a qualsevol controvèrsia, les parts es sotmeten als jutjats i tribunals de Castelldefels (Barcelona), amb renúncia a qualsevol altre fur que els pugui correspondre.</p>
      
      <p>En utilitzar aquest lloc web, accepteu íntegrament aquests termes i condicions.</p>
    `,
  },
  privacy: {
    title: "Política de Privacitat",
    content: `
      <h2>Política de Privacitat</h2>
      <p><strong>Data d'entrada en vigor:</strong> 15/03/2026</p>
      <p><strong>Responsable:</strong> Grup Sardanista Castelldefels</p>
      <p><strong>Web:</strong> https://grupsardanistacastelldefels.cat</p>
      
      <h3>1. Qui som i per què aquesta política és diferent?</h3>
      <p>Som el <strong>Grup Sardanista Castelldefels</strong>, una entitat cultural sense ànim de lucre dedicada a la promoció i difusió de la sardana i la cultura popular a Castelldefels.</p>
      <p>A diferència de moltes pàgines web que comparteixen les vostres dades amb tercers amb finalitats comercials, nosaltres <strong>no venem ni cedim les vostres dades</strong>. Les utilitzem únicament per gestionar la vostra relació amb l'entitat: inscripcions, comunicacions internes, activitats pròpies i millora de la nostra pàgina web. La vostra confiança és el nostre principal actiu.</p>
      
      <h3>2. Responsable del Tractament</h3>
      <p><strong>Identitat:</strong> Grup Sardanista Castelldefels<br />
      <strong>Activitat:</strong> Associació cultural sardanista<br />
      <strong>Contacte:</strong> sardanistacastelldefels.cat<br />
      <strong>Domicili:</strong> [Carrer de la Sardana, 12, 08860 Castelldefels, Barcelona]</p>
      
      <h3>3. Quines dades recollim i per a què?</h3>
      <p>Recollim únicament les dades necessàries per a la relació associativa i el funcionament del lloc web.</p>
      
      <h4>A. Formularis de registre, subscripció o sol·licitud d'informació</h4>
      <ul>
        <li><strong>Dades recollides:</strong> Nom, adreça electrònica, adreça postal, telèfon, dades demogràfiques (edat, població, etc.).</li>
        <li><strong>Finalitat:</strong> Gestionar la vostra inscripció com a soci o sòcia; enviar butlletins, convocatòries o informació de les activitats; respondre consultes.</li>
        <li><strong>Legitimació:</strong> Consentiment explícit (en marcar la casella de verificació).</li>
        <li><strong>Conservació:</strong> Mentre duri la relació associativa i, posteriorment, durant els terminis legals de prescripció de responsabilitats (comptables, fiscals, etc.).</li>
      </ul>
      
      <h4>B. Pagaments (quota d'inscripció o activitats)</h4>
      <ul>
        <li><strong>Dades recollides:</strong> Informació de pagament (xifrada, no emmagatzemem directament les dades completes de targeta).</li>
        <li><strong>Finalitat:</strong> Processar les quotes i inscripcions a activitats puntuals (cursos, ballades, excursions).</li>
        <li><strong>Legitimació:</strong> Execució d'un contracte o mesura precontractual.</li>
        <li><strong>Conservació:</strong> Segons el termini legal aplicable a transaccions econòmiques.</li>
      </ul>
      
      <h4>C. Dades de navegació i cookies</h4>
      <ul>
        <li>Utilitzem cookies per <strong>analitzar el trànsit</strong> (mesurar quanta gent ens visita, quines pàgines veuen) i <strong>recordar preferències</strong> (per exemple, idioma o acceptació de cookies).</li>
        <li><strong>Finalitat:</strong> Millorar l'experiència d'usuari i el contingut del web.</li>
        <li><strong>Legitimació:</strong> Consentiment previ mitjançant el <strong>banner de cookies</strong> que veieu en entrar.</li>
        <li><strong>Compartició:</strong> No utilitzem cookies de màrqueting extern ni venem dades de navegació.</li>
      </ul>
      
      <h3>4. Compartició de dades amb tercers</h3>
      <ul>
        <li><strong>No venem, no lloguem ni cedim les vostres dades personals</strong> a tercers aliens a l'associació.</li>
        <li><strong>Proveïdors tècnics (encarregats del tractament):</strong> Per poder funcionar, confiem en alguns serveis (per exemple, empresa d'allotjament del web, plataforma de pagament segur, sistema d'enviament de correus electrònics). Tots ells han signat un contracte de confidencialitat i compleixen el RGPD.</li>
        <li><strong>Transferències internacionals:</strong> Evitem enviar dades fora de l'Espai Econòmic Europeu. Si algun proveïdor ho requereix, exigim garanties adequades (clàusules tipus de la UE).</li>
      </ul>
      
      <h3>5. Seguretat de les dades</h3>
      <p>Apliquem mesures tècniques i organitzatives per protegir la vostra informació:</p>
      <ul>
        <li>Xifratge SSL/TLS a tot el lloc web.</li>
        <li>Accés restringit a les dades només a les persones autoritzades de l'entitat (secretariat, tresoreria).</li>
        <li>Mantenim còpies de seguretat regulars i entorns segurs.</li>
      </ul>
      <p>En el cas que utilitzem plataformes de pagament externes, les dades bancàries es xifren i no les emmagatzemem directament als nostres servidors.</p>
      
      <h3>6. Els vostres drets</h3>
      <p>Com a persona titular de les dades, teniu dret a:</p>
      <ul>
        <li><strong>Accés:</strong> saber quines dades vostres tenim.</li>
        <li><strong>Rectificació:</strong> modificar dades inexactes o incompletes.</li>
        <li><strong>Supressió ("dret a l'oblit"):</strong> sol·licitar que les eliminem quan ja no siguin necessàries.</li>
        <li><strong>Limitació del tractament</strong> o <strong>oposició</strong> en determinats supòsits.</li>
        <li><strong>Portabilitat:</strong> rebre les vostres dades en un format estructurat i comú.</li>
        <li><strong>Retirar el consentiment</strong> en qualsevol moment (sense que afecti la licitud del tractament anterior).</li>
      </ul>
      <p>Per exercir aquests drets, envieu un correu a <strong>grupsardanistacastelldefels@gmail.com</strong> adjuntant una còpia del vostre DNI o document identificatiu.</p>
      <p>Si no esteu satisfets amb la resposta, teniu dret a presentar una reclamació davant l'<strong>Autoritat Catalana de Protecció de Dades (APDCAT)</strong> o l'<strong>Agència Espanyola de Protecció de Dades (AEPD)</strong>.</p>
      
      <h3>7. Menors d'edat</h3>
      <p>No recollim conscientment dades personals de menors de 13 anys. Si descobrim que ho hem fet, les eliminarem de la nostra base de dades. Si sou pare, mare o tutor i creieu que un menor ens ha facilitat dades, contacteu amb nosaltres.</p>
      
      <h3>8. Canvis en aquesta política</h3>
      <p>Podem actualitzar aquesta política per adaptar-nos a canvis normatius o a noves formes de gestionar l'associació. Quan ho fem, publicarem la nova versió en aquesta mateixa pàgina i us ho notificarem per correu electrònic si el canvi és important.</p>
      
      <p><strong>Consentiment:</strong> En utilitzar aquest lloc web, accepteu la nostra política de privacitat. Quan faciliteu dades mitjançant formularis, doneu el vostre consentiment explícit per al tractament descrit.</p>
    `,
  },
  gdpr: {
    title: "Compliment del RGPD",
    content: `
      <h2>Compliment del Reglament General de Protecció de Dades (RGPD)</h2>
      <p><strong>Data d'entrada en vigor:</strong> 15/03/2026</p>
      <p>Aquesta pàgina us informa sobre les nostres polítiques relatives a la recollida, ús i divulgació de dades personals quan utilitzeu el nostre servei (aquest lloc web) i les opcions que teniu associades a aquestes dades.</p>
      
      <h3>Recollida i ús de la informació</h3>
      <p>Recollim diferents tipus d'informació per a diverses finalitats, amb l'objectiu de proporcionar-vos i millorar el nostre servei.</p>
      
      <h4>Tipus de dades recollides</h4>
      <h5>Dades personals</h5>
      <p>Quan utilitzeu el nostre servei, és possible que us demanem que ens proporcioneu determinada informació personalment identificable que es pot utilitzar per contactar o identificar-vos ("Dades personals"). Aquesta informació pot incloure, entre d'altres:</p>
      <ul>
        <li>Adreça electrònica</li>
        <li>Nom i cognoms</li>
        <li>Número de telèfon</li>
        <li>Adreça postal, població, codi postal</li>
        <li>Cookies i dades d'ús</li>
      </ul>
      
      <h5>Dades d'ús</h5>
      <p>També podem recollir informació sobre com s'accedeix i s'utilitza el servei ("Dades d'ús"). Aquestes Dades d'ús poden incloure informació com l'adreça del protocol d'Internet (IP) del vostre ordinador, tipus de navegador, versió del navegador, les pàgines del nostre servei que visiteu, l'hora i la data de la vostra visita, el temps que passeu en aquestes pàgines, identificadors únics del dispositiu i altres dades de diagnòstic.</p>
      
      <h3>Ús de les dades</h3>
      <p>El Grup Sardanista Castelldefels utilitza les dades recollides per a diverses finalitats:</p>
      <ul>
        <li>Per oferir i mantenir el servei</li>
        <li>Per notificar-vos canvis en el nostre servei</li>
        <li>Per permetre-us participar en funcions interactives del nostre servei quan trieu fer-ho</li>
        <li>Per oferir atenció al soci i suport</li>
        <li>Per proporcionar anàlisi o informació valuosa per tal de millorar el servei</li>
        <li>Per controlar l'ús del servei</li>
        <li>Per detectar, prevenir i abordar problemes tècnics</li>
      </ul>
      
      <h3>Base legal per al tractament</h3>
      <p>La base legal del Grup Sardanista Castelldefels per recollir i utilitzar la informació personal descrita en aquesta Política de Privacitat depèn de les Dades personals que recollim i del context específic en què les recollim.</p>
      <p>El Grup Sardanista Castelldefels pot tractar les vostres Dades personals perquè:</p>
      <ul>
        <li>Necessitem executar un contracte amb vosaltres (per exemple, la inscripció com a soci)</li>
        <li>Ens heu donat permís per fer-ho</li>
        <li>El tractament respon a un interès legítim i no està per sobre dels vostres drets</li>
        <li>Per complir amb la llei</li>
      </ul>
      
      <h3>Conservació de les dades</h3>
      <p>El Grup Sardanista Castelldefels conservarà les vostres Dades personals només durant el temps que sigui necessari per a les finalitats establertes en aquesta Política de Privacitat. Conservarem i utilitzarem les vostres Dades personals en la mesura necessària per complir amb les nostres obligacions legals (per exemple, si ens exigeixen conservar les vostres dades per complir amb les lleis aplicables), resoldre disputes i fer complir els nostres acords i polítiques legals.</p>
      
      <h3>Transferència de dades</h3>
      <p>La vostra informació, incloses les Dades personals, es pot transferir a — i mantenir en — ordinadors situats fora del vostre estat, província, país o altra jurisdicció governamental on les lleis de protecció de dades poden diferir de les de la vostra jurisdicció. Malgrat això, evitem al màxim les transferències internacionals i, quan es produeixen, exigim garanties adequades.</p>
      
      <h3>Divulgació de dades</h3>
      <h4>Requisits legals</h4>
      <p>El Grup Sardanista Castelldefels pot divulgar les vostres Dades personals creient de bona fe que aquesta acció és necessària per:</p>
      <ul>
        <li>Complir amb una obligació legal</li>
        <li>Protegir i defensar els drets o la propietat del Grup Sardanista Castelldefels</li>
        <li>Prevenir o investigar possibles actes il·lícits en relació amb el servei</li>
        <li>Protegir la seguretat personal dels usuaris del servei o del públic</li>
        <li>Protegir-se contra responsabilitat legal</li>
      </ul>
      
      <h3>Seguretat de les dades</h3>
      <p>La seguretat de les vostres dades és important per a nosaltres, però recordeu que cap mètode de transmissió per Internet o mètode d'emmagatzematge electrònic és 100% segur. Tot i que ens esforcem per utilitzar mitjans comercialment acceptables per protegir les vostres Dades personals, no podem garantir la seva seguretat absoluta.</p>
      
      <h3>Els vostres drets de protecció de dades segons el RGPD</h3>
      <p>Si sou resident de l'Espai Econòmic Europeu (EEE), teniu determinats drets de protecció de dades. El Grup Sardanista Castelldefels té la intenció de prendre mesures raonables per permetre-us corregir, esmenar, suprimir o limitar l'ús de les vostres Dades personals.</p>
      
      <p>Si voleu ser informat sobre quines Dades personals tenim sobre vosaltres i si voleu que es suprimeixin dels nostres sistemes, poseu-vos en contacte amb nosaltres.</p>
      
      <p>En determinades circumstàncies, teniu els següents drets de protecció de dades:</p>
      <ul>
        <li>Dret a accedir, actualitzar o suprimir la informació que tenim sobre vosaltres</li>
        <li>Dret de rectificació</li>
        <li>Dret d'oposició</li>
        <li>Dret a la limitació del tractament</li>
        <li>Dret a la portabilitat de les dades</li>
        <li>Dret a retirar el consentiment</li>
      </ul>
      
      <h3>Proveïdors de serveis</h3>
      <p>Podem contractar empreses i persones terceres per facilitar el nostre servei ("Proveïdors de serveis"), per proporcionar el servei en nom nostre, per realitzar serveis relacionats amb el servei o per ajudar-nos a analitzar com s'utilitza el nostre servei.</p>
      
      <p>Aquests tercers tenen accés a les vostres Dades personals només per realitzar aquestes tasques en nom nostre i estan obligats a no divulgar-les ni utilitzar-les per a cap altre propòsit.</p>
      
      <p>Per a més informació sobre els vostres drets o per exercir-los, consulteu l'apartat 6 de la nostra <a href="/legal/privacy?type=privacy">Política de Privacitat</a> o escriviu-nos a sardanistacastelldefels.cat.</p>
    `,
  },
  cookies: {
    title: "Política de Cookies",
    content: `
      <h2>Política de Cookies</h2>
      <p><strong>Data d'entrada en vigor:</strong> 15/03/2026</p>
      <p>Aquesta Política de Cookies explica com el <strong>Grup Sardanista Castelldefels</strong> ("l'Associació", "nosaltres", "ens" o "el nostre") utilitza les cookies i tecnologies similars per reconèixer-vos quan visiteu el nostre lloc web a <strong>https://grupsardanistacastelldefels.cat</strong> ("el Lloc web"). Explica què són aquestes tecnologies i per què les utilitzem, així com els vostres drets per controlar el nostre ús d'aquestes.</p>
      
      <h3>Què són les cookies?</h3>
      <p>Les cookies són petits fitxers de dades que es col·loquen al vostre ordinador o dispositiu mòbil quan visiteu un lloc web. Les cookies són àmpliament utilitzades pels propietaris de llocs web per fer que els seus llocs funcionin, o perquè funcionin de manera més eficient, així com per proporcionar informes.</p>
      
      <h3>Per què utilitzem cookies?</h3>
      <p>Utilitzem cookies per reconèixer-vos quan visiteu el nostre Lloc web, per oferir funcions personalitzades i per analitzar el nostre trànsit i patrons d'ús. A diferència d'altres llocs, <strong>no utilitzem cookies de màrqueting extern ni venem dades de navegació</strong>.</p>
      
      <h3>Quins tipus de cookies utilitzem?</h3>
      
      <h4>Cookies essencials</h4>
      <p>Aquestes cookies són estrictament necessàries per proporcionar-vos els serveis disponibles a través del nostre Lloc web i per utilitzar algunes de les seves funcions, com ara accedir a àrees segures (per exemple, l'àrea de socis). No es poden desactivar dels nostres sistemes.</p>
      
      <h4>Cookies de rendiment i funcionalitat</h4>
      <p>Aquestes cookies s'utilitzen per millorar el rendiment i la funcionalitat del nostre Lloc web, però no són essencials per al seu ús. Sense aquestes cookies, és possible que determinades funcionalitats (com recordar les vostres preferències d'acceptació de cookies) quedin indisponibles.</p>
      
      <h4>Cookies analítiques i de personalització</h4>
      <p>Aquestes cookies recullen informació que s'utilitza de forma agregada per ajudar-nos a entendre com s'utilitza el nostre Lloc web (per exemple, quines pàgines es visiten més) o per personalitzar la vostra experiència. Nosaltres <strong>no utilitzem eines de rastreig intrusives</strong> com Google Analytics estàndard; en el seu lloc, fem servir analítiques respectuoses amb la privadesa que anonimitzen les adreces IP.</p>
      
      <h4>Cookies de contingut multimèdia (Vimeo)</h4>
      <p>Quan reproduïu un vídeo de Vimeo incrustat al nostre Lloc web, aquesta plataforma pot establir cookies al vostre navegador per al funcionament del reproductor, analítiques pròpies o personalització. Per a la vostra privacitat, utilitzem Vimeo amb el paràmetre <code>dnt=1</code> (Do Not Track), que limita la recollida de dades. No obstant això, aquests vídeos només es carreguen després d'obtenir el vostre consentiment exprés mitjançant el banner de cookies. Podeu obtenir més informació sobre les cookies de Vimeo a la seva <a href="https://vimeo.com/cookie_policy" target="_blank" rel="noopener noreferrer">Política de Cookies</a>.</p>
      
      <h3>Resum de cookies utilitzades</h3>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Tipus</th>
            <th>Finalitat</th>
            <th>Durada</th>
            <th>Proveïdor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>cookieConsent</td>
            <td>Essencial</td>
            <td>Guardar la preferència de consentiment de cookies</td>
            <td>1 any</td>
            <td>Pròpia</td>
          </tr>
          <tr>
            <td>_ga, _gid</td>
            <td>Analítica</td>
            <td>Google Analytics (mesura d’audiència)</td>
            <td>2 anys / 24h</td>
            <td>Google</td>
          </tr>
          <tr>
            <td>vuid, player</td>
            <td>Multimèdia</td>
            <td>Funcionament i analítica del reproductor de Vimeo</td>
            <td>2 anys / Sessió</td>
            <td>Vimeo</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Com podeu controlar les cookies?</h3>
      <p>Teniu dret a decidir si accepteu o rebutgeu les cookies. Podeu configurar o modificar els controls del vostre navegador web per acceptar o rebutjar les cookies. Si trieu rebutjar les cookies, encara podeu utilitzar el nostre Lloc web, tot i que algunes funcions poden veure's limitades.</p>
      <p>La majoria de navegadors us permeten:</p>
      <ul>
        <li>Veure quines cookies teniu actives</li>
        <li>Esborrar totes les cookies</li>
        <li>Blocar les cookies de llocs específics o de tots els llocs</li>
      </ul>
      
      <h3>Amb quina freqüència actualitzarem aquesta Política de Cookies?</h3>
      <p>Podem actualitzar aquesta Política de Cookies periòdicament per reflectir, per exemple, canvis en les cookies que utilitzem o per altres motius operatius, legals o reglamentaris. Per tant, us recomanem revisar aquesta Política de Cookies regularment per mantenir-vos informat sobre l'ús de les cookies i tecnologies relacionades.</p>
      
      <h3>On podeu obtenir més informació?</h3>
      <p>Si teniu cap pregunta sobre l'ús de cookies o altres tecnologies, envieu-nos un correu electrònic a <strong>hola@grupsardanistacastelldefels.cat</strong>.</p>
      
      <h3>Consentiment</h3>
      <p>En accedir al nostre lloc web, us mostrem un banner de cookies on podeu acceptar o rebutjar l’ús de cookies no essencials (analítiques, multimèdia, etc.). Les cookies de Vimeo i altres serveis externs només es carreguen després d’obtenir el vostre consentiment exprés. Podeu canviar o retirar el vostre consentiment en qualsevol moment des de la configuració de cookies del web.</p>
    `,
  },
};

function LegalPage({ type }) {
  const content = legalContent[type] || legalContent.terms;

  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%" zIndex={999}>
        <DefaultNavbar
          routes={routes}
          action={{
            type: "internal",
            route: "/contacte",
            label: "Contacta'ns",
            color: "info",
          }}
        />
      </MKBox>

      <MKBox
        minHeight="60vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.1),
              rgba(gradients.info.state, 0.1)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <MKBox>
          <MKTypography
            variant="h2"
            color="white"
            textAlign="center"
            sx={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
          >
            {content.title}
          </MKTypography>
        </MKBox>
      </MKBox>

      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <MKTypography variant="body1" color="text">
          <div dangerouslySetInnerHTML={{ __html: content.content }} />
        </MKTypography>
      </Card>

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

LegalPage.propTypes = {
  type: PropTypes.string.isRequired,
};

export default LegalPage;
