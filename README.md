# Exchange currency helper (ex-helper)

A vue-application provides simple way to convert currencies to UAH 
via bank.gov.ua API by chosen date.

It could be used for creating tax report and fill incomes book 
of individual entrepreneur (3rd group).



### Installation

Download or clone repo.



### Build

Goto path:
```cd <path>/exchange-currency-helper```

Update npm libraries:
```npm install```

Build application:
```npm run build```

### Run

Server mode:

```npm run serve```

Create web-server proxy config for localhost:port

OR

Static-content mode:

```cp <path>/exchange-currency-helper/dist <target>```

Create web-server config for static content at <target> (/var/www/...)

### [Demo](http://162.250.120.118:8004)



### Stack

* vue
