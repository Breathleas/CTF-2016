private String pattern = "'|\"|\\*|\\\\|<|>|\\(|\\)|!|;|exec|chr|char|bin|hex|oct|concat|and|select|update|insert|delete|union|from|between|trim|replace|reverse|set|mid|conv|load_file";
public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain filterChain) throws IOException, ServletException {
    try {
        Enumeration<String> nameIter = request.getParameterNames();
        while (nameIter.hasMoreElements()) {
            String name = nameIter.nextElement();
            String value = request.getParameter(name);

            Pattern r = Pattern.compile(pattern,Pattern.CASE_INSENSITIVE);
            Matcher m = r.matcher(value);
            if (m.find()) {
                throw new Exception("illegal");
            }
        }
    }
    catch (Exception ex) {
        request.getRequestDispatcher("/403").forward(request, response);
        return;
    }
    filterChain.doFilter(request, response);
}

@RequestMapping(value = "/isAvailable", method = RequestMethod.GET)
public @ResponseBody String findByTable(@RequestParam("table") String table) {
    try {
        Query query = em.createQuery("from " + table);
        if (!query.getResultList().isEmpty())
        {
            return "OK";
        }
        else {
            return "Error";
        }
    } catch (Exception ex) {
        return "Exception";
    }
}