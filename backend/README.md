### Server setup log and notes
helper file for posterior
***don't forget about .gitignore***

*** npm init -y ***
to generate package.json
*** npm i -d typescript ***
adding typescript as dev dependency
*** npx tsc --init ***
ts config file 

*** npm i -D ts-node ***
module for compiling server.ts and running an output server.js with node
"start": "ts-node src/server.ts",

*** npm i -D ts-node-dev ***
to watch the files for changes and to restart the server
necessary to enable this script
 "start": "ts-node-dev --respawn backend/src/server.ts",
 
*** npm i -D nodemon ***
does the same as the one above (need only one)
"dev": "nodemon --exec ts-node backend/src/server.ts",
*** npm i express ***
the framework I use for node
*** npm i -D @types/express ***
type definitions for express
*** npm i -D @types/node ***
package with node type definitions
**installed: axios, bcrypt, colors, dotenv, express-async-handler, jsonwebtoken, mongoose**
**added the db.ts** // useCreateIndex: true, this option was no longer supported - I think it was depreciated 
ok. moongose 6.0+ doesn't support the following: useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex. It's safe to remove it from my code. (I used it in moongose ver 5.12.5.)
*** src/seeder *** + "data:import": "node backend/src/seeder",
    "data:destroy": "node backend/src/seeder -d" - still doesn't work 
*** 2 ***
*** 2 ***
*** 2 ***

### misc 
to add types for a module that I can't find types for 
I created a folder  ├──@types
                            ├──`example.d.ts` that contains `declare module 'example';`
                            this declares the module as any type 

***When TS compiler lags ctrl + shift + p -> typeScript reset TS server ***

***req.name = 'bob' - when things don't work in TS I can escape it***
`req.name = 'bob'` - no such thing in definitions
         `(req as any).name = 'bob'`

*** functions as per usual TS,  ***
`const add = (a: number, b?: number): number => {return a+b}`
<!-- if I don't pass b  -->
add(1)
<!-- then - there will be TS error  -->
`object is possibly undefined`
<!-- one way to get rid of it is: -->
`const add = (a: number, b?: number): number => {
    if(b) {
    return a+b}  
    } else {
        return a
    }
}` 
 
<!-- or I can add ! if I know it's defined -->

`const add = (a: number, b?: number): number => {                                                    return a+b!}`
<!-- or I can add above it -->
`// @ts-ignore` 
`const add = (a: number, b?: number): number => {                                                    return a+b!}`

***Interface and Type***
interface Params {
    a: number
    b: number
}

type Add =(x: Params) => number

const add: Add = x => {
    return x.a + a.b
}

0. <!-- Nodemailer functionality -->
npm install nodemailer 


2. create tokenSchema
3. Configure The Email Transporter
utils/sendEmail.ts 
<!-- 4. passwordResetRoutes & passwordResetController  -->

<!-- different approach to resetting the password -->
1. sendUserIdToResetPassword - frontend - thunk to hit the /users/resetPassword route
2. resetUserPassword - controller
3. users/resetPassword


<!-- yet another way of resetting the password via email -->

1. Added   `resetPasswordToken: { type: String, required: false, }, resetPasswordExpires: { type: Date, required: false, },` to userModel.ts 
2. Added forgotPassword route to user routes - this will be hit when user requests to have an email sent to reset the password -
3. added forgotUserPassword controller - it will be used in the beforementioned route
4. installed crypto to generate a resetToken
<!-- up to this point it works, ie. I create a token and expiration date in the user object -->
5. create a route resetUserPassword when hit it would find the user by the resetToken provided
after finding the user it would log him in and enable the password update
6. install sequelize to compare the expiration date of resetToken


* Signup Confirmation Email With Node.js 
|   ├── 
1.  Prepare the User Model
 adding status:
  ├──  new user will be created with “Pending” status by default
 `status: {
      type: String, 
      enum: ['Pending', 'Active'],
      default: 'Pending'
    },`
adding confirmationCode
  ├── `confirmationCode: { 
      type: String, 
      unique: true },`
2. Login procedures change:
Only users with `status : active` will be able to login
||||| when I hit users/login route |||||   ├── if (user.status != "Active") {
        return res.status(401).send({
          message: "Pending Account. Please Verify Your Email!",
        });
      }

2. Register procedures change:      
   ├── create registration token - I think similar to the one used for resetting the password will suffice 
   ├── so when users/register route is hit it will create a token for registration 
3.  Create the confirmation route
        ├── backend route that changes status on Active after comparing the registration token with the one in the db
            ├──
        `User.findOne({confirmationCode: req.params.confirmationCode})`
4. Send the Confirmation Email
|email|_https:__&token____=>||change the status from `Pending` to `Active`||
||||||||_________________________|||||||||||||||||
         ├── will hit a 
5. Create a welcome screen

...confirmUser controller


|   ├──user model updated 
|        ├── confirmationCode
|        ├── status: Active | Pending


/adminconfirmation').put(confirmUserByAdmin)
| route  ├── /userconfirmation  
- put - (confirmUser) - users passess confirmationCode from a link and it changes the status to active 
| route  ├── /adminconfirmation/:id 
- put - confirmUserByAdmin - admin changes the status to active|pending, passes id in request
- post - confirmOldUserByAdmin - admin adds status: active and confirmationCode to the old user that created his account durin earlier version of the authentication

registerUser - changelog:
- added status: 'Pending'
- added confirmationCode: 

updateUser: to include status change

confirmUser -used by the user by passing the confirmationCode to change the status to active
    ├── /userconfirmation    
                    ├── confirmUser
    tested in FE in userConfirm thunk  in Login.tsx   


registerUser - create the confirmationToken and send it to users email
forgotUserPassword - resetPasswordToken send it to provided email


|   ├── be/utilities/nodemailerTestTwo for testing purposes - this one works
                           ├──takes htmlBody as a new prop 


controllers that use nodemailer module
|forgotUserPassword | sends an email with resetPasswordToken
|registerUser| sends an email with confirmationToken
|user will receive token in the email with the link to login site where he uses this token to log in   ├── this is the new method 

|   ├── 
testActivateUser - > confirmUser 
STILL DOESNT WORK !!!!
EXTERNAL LINK IS CAUSING THE SERVER RESPONSE HOWEVER IT IS NOT REFLECTED IN THE DB

Misc 

Nullish Coalescing
    let x = foo ?? bar() return foo if it's not null or undefined otherwise calculate bar

“Non-null assertion operator“

    const selectionRange = selection!.getRangeAt(0)
    basically it means that when you add the exclamation mark after a property/value, you are telling TypeScript that you are certain that value is not null or undefined.

BE fragment functionality
@route POST /api/fragments - addNewFragment (controller)

@route PUT /api/fragments/:id  - updateFragment (c)

@route GET /api/fragments/myfragments - getMyFragments (c)

@route DELETE /api/fragments/:id - deleteFragment (c)

@route GET /api/fragments - getAllFragments (c)