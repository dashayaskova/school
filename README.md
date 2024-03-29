<h1>School</h1>
School website React/Nextjs + ASP.NET CORE

<p>Simple school app with microservice architecture, material design and Firebase authentification.&nbsp;</p>
<br />
<h2>Stack</h2>
<ul>
<li>React</li>
<li>Next.js</li>
<li>Material-UI</li>
<li>Material-table</li>
<li>Firebase auth</li>
<li>Express</li>
<li>ASP.NET Core</li>
<li>GraphQL</li>
</ul>
<p>&nbsp;</p>
<h2>Application arhitecture</h2>
<p>User tries to login</p>
<p><img width="700px" src="/readme/Picture12.jpg" alt="Login architecture"></p>
<br />
<p>Admin opens page with users</p>
<p><img width="700px" src="/readme/Picture13.png" alt="Users page architecture"></p>
<br />
<p>Admin adds user</p>
<p><img width="700px" src="/readme/Picture14.png" alt="Add user architecture"></p>
<br />
<p>&nbsp;</p>
<h2>MVP</h2>
<p><br />Two types of users:</p>
<ul>
<li>teacher</li>
<li>admin</li>
</ul>
<p>Admin can:</p>
<ul>
<li>add user (teacher or another admin)</li>
<li>edit/remove user</li>
<li>give teachers access to their classes and subjects</li>
<li>add/edit/remove classes</li>
<li>get class students</li>
<li>add/edit/remove students to the common storage</li>
<li>add student to the certain class</li>
<li>add/edit/remove subjects to the certain class</li>
<li>add/edit/remove grades to the certain student</li>
<li>get auto-generated report card for the certain student</li>
</ul>
<p>Teacher can:</p>
<ul>
<li>get students of the classes, they have access to</li>
<li>add/edit students to the common storage</li>
<li>add/remove students to the classes, they have access to</li>
<li>add/edit/remove grades to the certain student</li>
<li>get auto-generated report card for the certain student</li>
</ul>
<br />
<h2>Screenshots</h2>
<h4>Login page</h4>
<p><img width="700px" src="/readme/Picture11.png" alt="Login page"></p>
<p>There is no sign up page, because admin adds users.&nbsp;</p>
<br />
<h4>Page with all users</h4>
<img width="700px" src="/readme/Picture10.png" alt="Users page">
<p>In the table you can search by specific words and sort columns.&nbsp;</p>
<br />
<h4>Add user page</h4>
<img width="700px" src="/readme/Picture9.png" alt="Add user page">
<br />
<h4>Edit user page</h4>
<img width="700px" src="/readme/Picture8.png" alt="Edit user page">
<br />
<h4>Student storage page</h4>
<img width="700px" src="/readme/Picture7.png" alt="Student storage page">
<br />
<h4>Classes page</h4>
<img width="700px" src="/readme/Picture6.png" alt="Classes page">
<br />
<h4>Class students page</h4>
<img width="700px" src="/readme/Picture5.png" alt="Class students page">
<br />
<h4>Class subjects page</h4>
<img width="700px" src="/readme/Picture4.png" alt="Class subjects page">
<br />
<h4>Subject grades page</h4>
<img width="700px" src="/readme/Picture3.png" alt="Subject grades page">
<br />
<h4>Grade column modal</h4>
<img width="700px" src="/readme/Picture2.png" alt="Grade column modal">
<br />
<h4>Student report card</h4>
<img width="700px" src="/readme/Picture1.png" alt="Student report card">
<p>&nbsp;</p>
<h2>Local development</h2>
<p>Before running containers, in <code>auth</code> and <code>nextjs-school</code> directories you need to enter environment variables into <code>.env</code> files. List with all the neccessary variables you can find in <code>.env.example</code> files.</p>
<br />
<p>Run container with auth server</p>
<code>docker-compose up --build -d auth</code>
<br />
<br />
<p>Run container with Next.js server</p>
<code>docker-compose up --build -d nextjs</code>
<br />
<br />
<p>Run container with graphql server</p>
<code>docker-compose up --build -d graphql</code>
<br />
<br />
<p>Open <a href="http://localhost:3000">localhost:3000</a></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
