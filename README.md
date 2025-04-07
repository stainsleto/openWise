
# OpenWise

An open source version of payment platforms like wise, venmo, zelle and etc.. 


* Transfer money from one account to another using the mail Id
* Can add money to the wallet
* OnRamp technique is used in the funding process of the wallet
* Mocked the bank servers with seperate nodeJs project for the payment success and processing status


## Demo

![login](https://github.com/stainsleto/openWise/blob/main/demo/login.png?raw=true)
![dashboard](https://github.com/stainsleto/openWise/blob/main/demo/dashboard.png?raw=true)
![peer to peer](https://github.com/stainsleto/openWise/blob/main/demo/peertopeer.png?raw=true)
![transactions](https://github.com/stainsleto/openWise/blob/main/demo/transaction.png?raw=true)
![wallet](https://github.com/stainsleto/openWise/blob/main/demo/wallet.png?raw=true)

## Tech Stack

- NextJs for the complete application
- nodeJs with express to implement on Ramp transactions
- NextAuth.Js (Auth.js) for the the authentication and jwt tokens
- Prisma is the ORM
- Postgresql for the database
- Typescript for typesafety
- Tailwindcss for styles
- shadcn/ui for ui components


## Steps to run the application

Clone the repo first :
``` git clone https://github.com/stainsleto/openwise ```

Install the node packages :
 ```npm install```

 Move to the db directory :
 ```cd packages/db```

Run prisma generate :
 ```npx prisma generate```

Move to the root directory and start the application : 
``` npm run dev ```


