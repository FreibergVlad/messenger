package com.freiberg.authserver.handlers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class LogoutSuccessHandler implements org.springframework.security.web.authentication.logout.LogoutSuccessHandler {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public void onLogoutSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException {
        if (authentication != null && authentication.getDetails() != null) {
            httpServletRequest.getSession().invalidate();
            String username = authentication.getName();
            logger.info("User {} successfully logged out", username);

            String postLogoutRedirectUri = httpServletRequest.getParameter("post_logout_redirect_uri");
            String referrer = httpServletRequest.getHeader("referrer");
            String redirectUri = postLogoutRedirectUri == null ? referrer : postLogoutRedirectUri;
            httpServletResponse.sendRedirect(redirectUri);
        }
    }
}
