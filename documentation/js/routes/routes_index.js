var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","redirectTo":"reportIssue","pathMatch":"full"},{"path":"login","component":"LoginPageComponent"},{"path":"reportIssue","component":"ReportIssuePageComponent","canActivate":["AuthGuard"]},{"path":"allIssues","component":"AllIssuesPageComponent","canActivate":["AuthGuard"]},{"path":"myIssues","component":"AllIssuesPageComponent","canActivate":["AuthGuard"]},{"path":"myAccount","component":"UserPageComponent","canActivate":["AuthGuard"]},{"path":"admin","component":"AdminPageComponent","canActivate":["AuthGuard"]},{"path":"issue/:id","component":"IssueDetailsPageComponent","canActivate":["AuthGuard"]}],"kind":"module"}]}
