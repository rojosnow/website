import React from 'react';
import { Button, Dropdown, Icon, Layout, Menu, Popover } from 'antd';
import styled from 'styled-components';
import { Link, scrollTo } from 'react-static';
import { size } from '@src/breakpoints';
import logoImg from '@images/logo_light.svg';

const { Header } = Layout;
const { SubMenu } = Menu;
const externalLinks = ['/whitepaper', '/blog', '/faq', '/telegram'];

export const Logo = styled.div`
  line-height: 64px;
  margin: 0;
  float: left;
  @media (max-width: ${size.mobileS}) {
    max-width: 200px;
  }
`;

export const StyledMenu = styled(Menu)`
  .ant-dropdown-menu {
    background: #fff;
    border-radius: 25px;
    padding: 10px;
  }
  .ant-dropdown-menu-item {
    padding: 10px;
    &:hover {
      background-color: #fff;
      color: #00e2c1;
    }
    &:first-child {
      border-radius: 25px 25px 0 0;
    }
    &:last-child {
      border-radius: 0 0 25px 25px;
    }
  }
  @media (max-width: ${size.tablet}) {
    &.ant-menu-dark {
      display: none;
    }
    &.ant-menu-light.ant-menu-inline {
      display: block;
      background: #fff;
      border-right: 0;
      .ant-menu-item-selected {
        border-radius: 12px;
        background-color: #f1f1f1;
        color: #00ad94;
      }
    }
  }
`;

const MobileMenuToggle = styled(Button)`
  &.ant-btn {
    display: none;
    cursor: pointer;
    float: right;
    margin-top: 13px;
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
  i {
    font-size: 20px;
    color: #fff;
  }
  @media (max-width: ${size.tablet}) {
    &.ant-btn {
      display: block;
    }
  }
  @media (max-width: ${size.mobileM}) {
    &.ant-btn {
      margin-left: 5px;
      width: 32px;
      height: 32px;
      margin-top: 17px;
      line-height: 32px;
      i {
        font-size: 16px;
      }
    }
  }
`;

const HeaderWrapper = styled.div`
  @media (max-width: ${size.mobileM}) {
    .ant-layout-header {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  @media (max-width: ${size.mobileS}) {
    .ant-layout-header {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
  .ant-popover-arrow {
    top: -4px;
  }
  .ant-popover-inner-content {
    padding-left: 10px;
    padding-right: 10px;
  }
  .ant-popover-inner {
    border-radius: 25px;
  }
`;

const DropdownTrigger = styled.a`
  color: #fff;
  float: left;
  &:hover {
    color: #00e2c1;
  }
  &:focus {
    text-decoration: none;
  }
  @media (max-width: ${size.tablet}) {
    color: #000;
    display: none;
    float: none;
    padding: 0 16px;
    line-height: 40px;
    height: 40px;
  }
`;

const StyledSubMenu = styled(SubMenu)`
  display: none;
  background: #fff;
  .ant-menu {
    background-color: #fff;
    border-right: 0;
  }
  .ant-menu-item:hover,
  .ant-menu-item-active,
  .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
  .ant-menu-submenu-active,
  .ant-menu-submenu-title:hover {
    border: 0;
  }
  @media (max-width: ${size.tablet}) {
    display: block;
  }
`;

interface LinkInterface {
  key: string;
  label: string;
  url: string;
}

const whitepapers: LinkInterface[] = [
  {
    key: '/whitepaper-english',
    label: 'English',
    url: 'https://www.marketprotocol.io/assets/MARKET_Protocol-Whitepaper.pdf'
  },
  {
    key: '/whitepaper-chinese',
    label: 'Chinese',
    url:
      'https://www.marketprotocol.io/assets/MARKET_Protocol-Whitepaper-Chinese.pdf'
  }
];

class Navbar extends React.Component {
  state = {
    current: ''
  };

  componentDidMount() {
    if (!externalLinks.includes(location.pathname)) {
      this.setState({
        current: location.pathname
      });
    }
  }

  handleClick = (e: React.ClickEvent) => {
    const path = e.key || e;
    if (!externalLinks.includes(path)) {
      this.setState({
        current: path
      });
    }
    const resolvedHash = path.substring(path.indexOf('#') + 1);
    if (path === location.pathname + location.hash) {
      const element = document.getElementById(resolvedHash);
      if (element !== null) {
        scrollTo(element as HTMLElement);
      }
    }
  }

  renderWhitepaperDropdownMenu(whitepapersList: LinkInterface[]): JSX.Element {
    return (
      <Menu>
        {whitepapersList.map(paper => {
          return (
            <Menu.Item key={paper.key}>
              <Link
                to={paper.url}
                style={{ color: 'inherit', textDecoration: 'none' }}
                target="_blank"
              >
                {paper.label}
              </Link>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }

  renderMenuMarkup(breakpoint: string): JSX.Element {
    const whitepaperLinks = this.renderWhitepaperDropdownMenu(whitepapers);

    return (
      <StyledMenu
        theme={breakpoint === 'desktop' ? 'dark' : 'light'}
        mode={breakpoint === 'desktop' ? 'horizontal' : 'inline'}
        style={{
          float: breakpoint === 'desktop' ? 'right' : 'none',
          lineHeight: '64px'
        }}
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
      >
        <Menu.Item key="/team">
          <Link to="/team" style={{ color: 'inherit', textDecoration: 'none' }}>
            Team
          </Link>
        </Menu.Item>
        <Dropdown
          overlay={whitepaperLinks}
          getPopupContainer={triggerNode =>
            triggerNode.parentNode as HTMLElement
          }
        >
          <DropdownTrigger
            className="ant-dropdown-link"
            href="#"
            style={{ padding: '0 20px' }}
          >
            Whitepaper
          </DropdownTrigger>
        </Dropdown>
        <StyledSubMenu title={'Whitepaper'} trigger={'click'}>
          {whitepaperLinks}
        </StyledSubMenu>
        <Menu.Item key="/faq">
          <Link
            to="https://docs.marketprotocol.io/#faq-general"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            FAQs
          </Link>
        </Menu.Item>
        <Menu.Item key="/#subscribe">
          <Link
            to="/#subscribe"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Subscribe
          </Link>
        </Menu.Item>
        <Menu.Item key="/blog">
          <Link
            to="https://medium.com/market-protocol"
            style={{ color: 'inherit', textDecoration: 'none' }}
            target="_blank"
          >
            Blog
          </Link>
        </Menu.Item>
        <Menu.Item key="/telegram">
          <Link
            to="https://t.me/Market_Protocol_Chat"
            style={{ color: 'inherit', textDecoration: 'none' }}
            target="_blank"
          >
            Telegram
          </Link>
        </Menu.Item>
      </StyledMenu>
    );
  }

  render(): JSX.Element {
    return (
      <HeaderWrapper>
        <Header>
          <Logo>
            <Link
              to="/"
              style={{ color: 'inherit', textDecoration: 'none' }}
              onClick={() => this.handleClick('/')}
            >
              <img alt="MARKET Protocol Logo" width="100%" src={logoImg} />
            </Link>
          </Logo>
          {this.renderMenuMarkup('desktop')}
          <Popover
            getPopupContainer={triggerNode =>
              triggerNode.parentNode as HTMLElement
            }
            content={this.renderMenuMarkup('mobile')}
            trigger="click"
            arrowPointAtCenter={true}
          >
            <MobileMenuToggle shape="circle" icon="bars" />
          </Popover>
        </Header>
      </HeaderWrapper>
    );
  }
}

export default Navbar;
