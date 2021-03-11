# react-app-template
This project is a basic template for a react application using webpack.

## Content
* Webpack configuration for local and production.
* Public folder like create-react-app.
* Src folder without file structuring.
* Babel configuration to work with react.
* Eslint with basic configuration **using Wesbos**
* I believe the template works with bot css and scss (including scss modules).
* MIT license.

#### Important Notes

* The **src folder** contains an App folder similar to create-react-app.
* I mostly use scss so if css does not work, let me know.
* To use scss modules create a file with a name: ```YourName.module.scss```, this way you can use it like:
```
import styles from 'YourName.module.scss';

<div className={styles.YourClass}> Bla bla bla </div>
```

#### Recommendations

I personally like to use **npm-check** package because it offers a way to visualize which package to update and it highlights
if the package update is a patch, minor update, potentially breaker, etc.

You can use the command **npm-check -u** to see it this way and **select only** the packages you want to update.

Feel free to contact me if you have suggestions/requests.
