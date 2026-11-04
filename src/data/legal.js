import { brand } from '../config/brand.js';

// Starter legal copy for social365. Have it reviewed against the agency's actual practices and local law before relying on it.
export const legalContent = {
  'privacy-policy': {
    title: 'Privacy', italic: 'without surprises.', intro: 'Last updated: November 2026',
    sections: [
      ['01. What we collect', 'If you contact us, we may receive the information you choose to share, such as your name, email address and project details.'],
      ['02. How we use it', 'We use enquiry details to respond, discuss potential work and operate this website. We do not sell personal information.'],
      ['03. Cookies & analytics', 'This website does not intentionally set analytics cookies. If analytics or third-party embeds are added, this policy will be updated to explain them.'],
      ['04. Data retention', 'We keep enquiry information only as long as reasonably necessary for communication, business operations or legal requirements.'],
      ['05. Your choices', `You can request access to, correction of or deletion of your personal information by writing to ${brand.email}.`],
      ['06. Contact', `For privacy questions, email ${brand.email}.`],
    ],
  },
  terms: {
    title: 'Terms &', italic: 'conditions.', intro: 'Last updated: November 2026',
    sections: [
      ['01. Website information', 'This website describes the services of social365. Content and service descriptions are for general information and are not a binding offer.'],
      ['02. Services & proposals', 'Project scope, deliverables, timelines, fees and payment terms are agreed in writing before work begins.'],
      ['03. Intellectual property', 'Unless otherwise agreed in writing, the website design, text and original artwork are protected by applicable intellectual property laws.'],
      ['04. Third-party links', 'Links to third-party websites, including social media, are provided for convenience. We are not responsible for their content, security or privacy practices.'],
      ['05. Liability', 'To the extent permitted by law, use of this website is at your own discretion.'],
      ['06. Contact', `Questions about these terms can be sent to ${brand.email}.`],
    ],
  },
};
