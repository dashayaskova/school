# school
School website React/Nextjs + ASP.NET CORE

<p>Simple school app with microservice architecture, material design and Firebase authentification.&nbsp;</p>
<h3><br />Stack:</h3>
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
<h3>Microservice arhitecture</h3>
<p>User tries to login</p>
<p><img width="700px" src="/readme/photo_2020-11-09_10-16-47.jpg" alt="Login architecture"></p>
<br />
<p>Admin opens page with users</p>
<p><img width="700px" src="/readme/photo_2020-11-09_10-16-53.jpg" alt="Users page architecture"></p>
<br />
<p>Admin adds user</p>
<p><img width="700px" src="/readme/photo_2020-11-09_10-16-57.jpg" alt="Add user architecture"></p>
<br />
<p>&nbsp;</p>
<h3>MVP:</h3>
<p><br />Two types of users:</p>
<ul>
<li>teacher</li>
<li>admin</li>
</ul>
<p>Admin can:</p>
<ul>
<li>add user (teacher or another user)</li>
<li>edit user</li>
<li>delete user</li>
<li>add classes to which specific teacher will have access</li>
<li>lookup through all users</li>
<li>have access to all classes</li>
</ul>
<br />
<h4>Login page</h4>
<p><img src="/readme/photo_2020-11-10_14-37-56.jpg" alt="Login page"></p>
<p>There is no sign up page, because admin adds users.&nbsp;</p>
<br />
<h4>Error message if data is incorrect</h4>
<p><img src="/readme/photo_2020-11-10_14-38-01.jpg" alt="Login page"></p>
<br />
<h4>Page with all users</h4>
<img src="/readme/photo_2020-11-10_14-38-12.jpg" alt="Users page">
<p>In the table you can search by specific words and sort columns.&nbsp;</p>
<br />
<h4>Add user page</h4>
<img src="/readme/photo_2020-11-10_14-38-16.jpg" alt="Add user page">
<br />
<h4>Add access to specific classes for teacher</h4>
<img src="/readme/photo_2020-11-10_14-38-24.jpg" alt="Add user classes page">
<br />
<h4>Edit user page</h4>
<img src="/readme/photo_2020-11-10_14-38-20.jpg" alt="Edit user page">
<p>In edit mode no opportunity to change email.</p>
<br />
<h4>Remove user</h4>
<img src="/readme/photo_2020-11-10_14-38-27.jpg" alt="Remove user">
<p>&nbsp;</p>
<h3>Development</h3>
<p>Make sure you have installed NodeJS and .NET Core.<br />Install node_modules in <code>nextjs-school</code> and <code>auth</code> directories</p>
<br />
<code>npm install</code>
<br />
<br />
<p>Run auth server in the <code>auth</code> directory</p>
<code>npm run start</code>
<br />
<br />
<p>Run Next.js server in the <code>nextjs-school</code> directory</p>
<code>npm run start</code>
<br />
<br />
<p>Run graphql server in the <code>School/School</code> directory</p>
<code>dotnet run School.csproj</code>
<br />
<br />
<p>Open <a href="http://localhost:3000">localhost:3000</a></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
