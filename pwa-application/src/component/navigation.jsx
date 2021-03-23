import React, { useCallback, useMemo } from 'react';
import CHROMIUM_LOGO from '../assets/images/chromium.svg';
import WEBSITE_LOGO from '../assets/images/website.svg';
import LINKEDIN_LOGO from '../assets/images/linkedin.svg';
import GITHUB_LOGO from '../assets/images/github.svg';
import MAIL_LOGO from '../assets/images/mail.svg';
import TWITTER_LOGO from '../assets/images/twitter.svg';
import { useHistory } from 'react-router';
import '../assets/css/navigationPanel.css';

const NavigationPanel = ({ state, setState, navigationComponents }) => {
  const history = useHistory();

  const socialLinks = useMemo(
    () => [
      {
        name: 'Raghav Dhingra | WebOS',
        link: 'https://raghavdhingra.com',
        image: WEBSITE_LOGO,
      },
      {
        name: 'Raghav Dhingra | GitHub',
        link: 'https://github.com/raghavdhingra',
        image: GITHUB_LOGO,
      },
      {
        name: 'Raghav Dhingra | LinkedIn',
        link: 'https://www.linkedin.com/in/raghav-dhingra',
        image: LINKEDIN_LOGO,
      },
      {
        name: 'Raghav Dhingra | Mail',
        link: 'mailto:admin@raghavdhingra.com,raghav.dhingra15@gmail.com',
        image: MAIL_LOGO,
      },
      {
        name: 'Raghav Dhingra | Twitter',
        link: 'https://twitter.com/raghavdhingra15',
        image: TWITTER_LOGO,
      },
    ],
    []
  );
  const changeNavigation = useCallback(
    (index) => {
      setState({ ...state, navigationIndex: index, mobileNavOpen: false });
      history.push(navigationComponents[index].link);
    },
    [history, navigationComponents, setState, state]
  );

  return (
    <div
      className={`navigation-panel-container ${
        state.mobileNavOpen ? '' : 'navigation-panel-container-close'
      }`}
    >
      <div className="navigation-header">
        <div className="centralise">
          <img src={CHROMIUM_LOGO} alt="Chromium Logo" width="45px" />
        </div>
        <div className="centralise">Chromium</div>
      </div>
      <div className="navigation-component-container">
        {navigationComponents.map((component, index) => (
          <div
            className={`navigation-component ${
              state.navigationIndex === index
                ? 'navigation-component-active'
                : ''
            }`}
            key={`navigation-${index}`}
            onClick={() => changeNavigation(index)}
          >
            {component.name}
          </div>
        ))}
      </div>
      <div className="navigation-footer">
        {socialLinks.map((link, index) => (
          <div className="social-icons" key={`social-links-${index}`}>
            <a href={link.link} target="_blank" rel="noreferrer">
              <img src={link.image} alt={link.name} width="30px" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationPanel;
