package com.hrportal.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;

import org.springframework.stereotype.Component;

@Component
public class SessionFilter implements Filter {

    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain chain
    ) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        HttpSession session = httpRequest.getSession(false); 

        String path = httpRequest.getRequestURI();

       
        if (path.startsWith("/api/auth") || 
            path.startsWith("/html/login.html") || 
            path.startsWith("/css/") || 
            path.startsWith("/js/")) {
            chain.doFilter(request, response);
            return;
        }

       
        if (session == null || session.getAttribute("hr_user") == null) {
            httpResponse.sendRedirect("/html/login.html");
            return;
        }

        
        chain.doFilter(request, response);
    }
}