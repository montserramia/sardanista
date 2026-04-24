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
    title: "Terms & Conditions",
    content: `
      <h2>Terms & Conditions</h2>
      <p>Last updated: [DATE]</p>
      <p>Welcome to [WEBSITE NAME]. These terms and conditions outline the rules and regulations for the use of [COMPANY NAME]'s Website, located at [WEBSITE URL].</p>
      <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use [WEBSITE NAME] if you do not agree to take all of the terms and conditions stated on this page.</p>
      
      <h3>Cookies</h3>
      <p>We employ the use of cookies. By accessing [WEBSITE NAME], you agreed to use cookies in agreement with the [COMPANY NAME]'s Privacy Policy.</p>
      
      <h3>License</h3>
      <p>Unless otherwise stated, [COMPANY NAME] and/or its licensors own the intellectual property rights for all material on [WEBSITE NAME]. All intellectual property rights are reserved. You may access this from [WEBSITE NAME] for your own personal use subjected to restrictions set in these terms and conditions.</p>
      
      <h3>User Comments</h3>
      <p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. [COMPANY NAME] does not filter, edit, publish or review Comments prior to their presence on the website.</p>
      
      <h3>Hyperlinking to our Content</h3>
      <p>The following organizations may link to our Website without prior written approval:</p>
      <ul>
        <li>Government agencies;</li>
        <li>Search engines;</li>
        <li>News organizations;</li>
        <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses.</li>
      </ul>
      
      <h3>iFrames</h3>
      <p>Without prior approval and written permission, you may not create frames around our Webpages that do not falsely imply or suggest sponsorship, endorsement or approval of the linking party and its products or services.</p>
      
      <h3>Reservation of Rights</h3>
      <p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time.</p>
      
      <h3>Removal of links from our website</h3>
      <p>If you find any link on our Website that is offensive for any reason, you are free to contact us and inform us at any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>
      
      <p>By using this website, you agree to be bound by these Terms and Conditions.</p>
    `,
  },
  privacy: {
    title: "Privacy Policy",
    content: `
      <h2>Privacy Policy</h2>
      <p>Last updated: [DATE]</p>
      <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website.</p>
      
      <h3>Information We Collect</h3>
      <p>We may collect information from you when you register on our site, subscribe to a newsletter, fill out a form or enter information on our site.</p>
      <p>We collect the following types of information:</p>
      <ul>
        <li>Name and email address</li>
        <li>Mailing address</li>
        <li>Phone number</li>
        <li>Payment information (encrypted)</li>
        <li>Demographic information</li>
      </ul>
      
      <h3>How We Use Your Information</h3>
      <p>We may use the information we collect from you in the following ways:</p>
      <ul>
        <li>To personalize your experience (your information helps us to better respond to your individual needs)</li>
        <li>To improve our website (we continually strive to improve our website offerings based on the information and feedback we receive from you)</li>
        <li>To improve customer service (your information helps us to more effectively respond to your customer service requests and support needs)</li>
        <li>To process transactions</li>
        <li>To administer a contest, promotion, survey or other site feature</li>
        <li>To send periodic emails</li>
      </ul>
      
      <h3>How We Protect Your Information</h3>
      <p>We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.</p>
      
      <h3>Cookies</h3>
      <p>We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.</p>
      
      <h3>Third-party Disclosure</h3>
      <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to maintain the confidentiality of your information.</p>
      
      <h3>Third-party Links</h3>
      <p>Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites.</p>
      
      <h3>California Online Privacy Protection Act</h3>
      <p>CalOPPA is the first state law in the nation to require commercial websites and online services to post a privacy policy. The law's reach stretches well beyond California to require a person or company in the United States (and conceivably the world) that operates websites collecting personally identifiable information from California consumers to post a conspicuous privacy policy on its website stating exactly the information being collected and those individuals with whom it is being shared.</p>
      
      <h3>Children's Online Privacy Protection Act</h3>
      <p>We believe in protecting the privacy of children. We do not knowingly collect personally identifiable information from children under 13. If we discover that a child under 13 has provided us with personal information, we will delete such information from our database.</p>
      
      <h3>Your Consent</h3>
      <p>By using our site, you consent to our privacy policy.</p>
      
      <h3>Changes to our Privacy Policy</h3>
      <p>If we decide to change our privacy policy, we will post those changes on this page.</p>
    `,
  },
  licenses: {
    title: "Licenses (EULA)",
    content: `
      <h2>End-User License Agreement (EULA)</h2>
      <p>Last updated: [DATE]</p>
      <p>This End-User License Agreement ("EULA") is a legal agreement between you and [COMPANY NAME] regarding the use of [PRODUCT/SERVICE NAME].</p>
      
      <h3>Grant of License</h3>
      <p>[COMPANY NAME] grants you a revocable, non-exclusive, non-transferable, limited license to download, install and use the Application solely for your personal, non-commercial purposes strictly in accordance with these terms.</p>
      
      <h3>Restrictions</h3>
      <p>You agree not to, and you will not permit others to license, sell, rent, lease, assign, distribute, transmit, host, outsource, disclose or otherwise commercially exploit the Application or make the Application available to any third party.</p>
      
      <h3>Modifications to Application</h3>
      <p>[COMPANY NAME] reserves the right to modify, suspend or discontinue, temporarily or permanently, the Application or any service to which it connects, with or without notice and without liability to you.</p>
      
      <h3>Term and Termination</h3>
      <p>This EULA shall remain in effect unless and until terminated by either you or [COMPANY NAME]. [COMPANY NAME] may, in its sole discretion, at any time and for any reason, suspend or terminate this EULA with or without prior notice.</p>
      
      <h3>Severability</h3>
      <p>If any provision of this EULA is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.</p>
      
      <p>By using this application, you acknowledge that you have read this EULA, understood it, and agree to be bound by its terms and conditions.</p>
    `,
  },
  gdpr: {
    title: "GDPR Compliance",
    content: `
      <h2>General Data Protection Regulation (GDPR) Compliance</h2>
      <p>Last updated: [DATE]</p>
      <p>This page informs you of our policies regarding the collection, use and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
      
      <h3>Information Collection and Use</h3>
      <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
      
      <h4>Types of Data Collected</h4>
      <h5>Personal Data</h5>
      <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data").</p>
      <p>Personally identifiable information may include, but is not limited to:</p>
      <ul>
        <li>Email address</li>
        <li>First name and last name</li>
        <li>Phone number</li>
        <li>Address, State, Province, ZIP/Postal code</li>
        <li>Cookies and Usage Data</li>
      </ul>
      
      <h5>Usage Data</h5>
      <p>We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
      
      <h3>Use of Data</h3>
      <p>[COMPANY NAME] uses the collected data for various purposes:</p>
      <ul>
        <li>To provide and maintain the Service</li>
        <li>To notify you about changes to our Service</li>
        <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
        <li>To provide customer care and support</li>
        <li>To provide analysis or valuable information so that we can improve the Service</li>
        <li>To monitor the usage of the Service</li>
        <li>To detect, prevent and address technical issues</li>
      </ul>
      
      <h3>Legal Basis for Processing</h3>
      <p>[COMPANY NAME] legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Data we collect and the specific context in which we collect it.</p>
      <p>[COMPANY NAME] may process your Personal Data because:</p>
      <ul>
        <li>We need to perform a contract with you</li>
        <li>You have given us permission to do so</li>
        <li>The processing is in our legitimate interests and it's not overridden by your rights</li>
        <li>For payment processing purposes</li>
        <li>To comply with the law</li>
      </ul>
      
      <h3>Retention of Data</h3>
      <p>[COMPANY NAME] will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
      
      <h3>Transfer of Data</h3>
      <p>Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.</p>
      
      <h3>Disclosure of Data</h3>
      <h4>Legal Requirements</h4>
      <p>[COMPANY NAME] may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
      <ul>
        <li>To comply with a legal obligation</li>
        <li>To protect and defend the rights or property of [COMPANY NAME]</li>
        <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
        <li>To protect the personal safety of users of the Service or the public</li>
        <li>To protect against legal liability</li>
      </ul>
      
      <h3>Security of Data</h3>
      <p>The security of your Data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
      
      <h3>Your Data Protection Rights Under GDPR</h3>
      <p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights. [COMPANY NAME] aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.</p>
      
      <p>If you wish to be informed about what Personal Data we hold about you and if you want it to be removed from our systems, please contact us.</p>
      
      <p>In certain circumstances, you have the following data protection rights:</p>
      <ul>
        <li>The right to access, update or to delete the information we have on you</li>
        <li>The right of rectification</li>
        <li>The right to object</li>
        <li>The right of restriction</li>
        <li>The right to data portability</li>
        <li>The right to withdraw consent</li>
      </ul>
      
      <h3>Service Providers</h3>
      <p>We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.</p>
      
      <p>These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
    `,
  },
  cookies: {
    title: "Cookie Policy",
    content: `
      <h2>Cookie Policy</h2>
      <p>Last updated: [DATE]</p>
      <p>This Cookie Policy explains how [COMPANY NAME] ("Company", "we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website at [DOMAIN] ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>
      
      <h3>What are cookies?</h3>
      <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
      
      <h3>Why do we use cookies?</h3>
      <p>We use cookies to recognize you when you visit our Website, to provide personalized features, and to analyze our traffic and usage patterns.</p>
      
      <h3>What types of cookies do we use?</h3>
      
      <h4>Essential website cookies</h4>
      <p>These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.</p>
      
      <h4>Performance and functionality cookies</h4>
      <p>These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.</p>
      
      <h4>Analytics and customization cookies</h4>
      <p>These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or to help us customize our Website for you.</p>
      
      <h4>Advertising cookies</h4>
      <p>These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.</p>
      
      <h4>Social networking cookies</h4>
      <p>These cookies are used when you share information using a social media sharing button or "like" button on our Site or you link your account or engage with our content on or through a social networking website such as Facebook, Twitter or Google+.</p>
      
      <h3>How can you control cookies?</h3>
      <p>You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies.</p>
      
      <h3>How often will you update this Cookie Policy?</h3>
      <p>We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.</p>
      
      <h3>Where can you get further information?</h3>
      <p>If you have any questions about our use of cookies or other technologies, please email us at [CONTACT EMAIL].</p>
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

      <MKBox pt={10} pb={6}>
        <MKBox
          sx={{
            maxWidth: "800px",
            mx: "auto",
            px: 3,
          }}
        >
          <MKTypography variant="body1" color="text">
            <div dangerouslySetInnerHTML={{ __html: content.content }} />
          </MKTypography>
        </MKBox>
      </MKBox>

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
