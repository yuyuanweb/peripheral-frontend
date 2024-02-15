import { history } from 'umi';
import { stringify } from 'querystring';
import { USER_ROLE_ENUM } from '@/constants/user';

/**
 * 重定向至登录页
 */
export const toLoginPage = () => {
  history.replace({
    pathname: '/user/login',
    search: stringify({
      redirect: window.location.href,
    }),
  });
};

/**
 * 是否为 VIP
 * @param user
 */
export const isVip = (user: API.UserVO) => {
  return user && user.userRole && user.userRole === USER_ROLE_ENUM.VIP;
};

/**
 * 是否为管理员
 * @param user
 */
export const isAdmin = (user: API.UserVO) => {
  return user && user.userRole === USER_ROLE_ENUM.ADMIN;
};


