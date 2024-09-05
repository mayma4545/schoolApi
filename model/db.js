const seq = require('sequelize')
const fs = require('fs')
const path = require("path")
const db = new seq.Sequelize("defaultdb","avnadmin","AVNS_tEWBhfrcQX2LOQKidxb",{
    host:'mysql-3cf41055-joa125790-9a17.h.aivencloud.com',
    dialect:'mysql',
    port:20435 ,
    logging:false,
    dialectOptions: {
        ssl: {
          ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUfkc/QWj53lrPi8n58qIOeLMkwFYwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvMThmNGMyMTUtYmM5ZS00M2VjLWFjZTItMzQ3NmUxYzNj
OTBkIFByb2plY3QgQ0EwHhcNMjQwODMwMDExMjUwWhcNMzQwODI4MDExMjUwWjA6
MTgwNgYDVQQDDC8xOGY0YzIxNS1iYzllLTQzZWMtYWNlMi0zNDc2ZTFjM2M5MGQg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBANGhTJQP
YbJQkYvACMPikDddPBQSgD1Y48V1W8wvMHM1GCu+Bkoi+Nj1nSb0XlZXHUFqCcLH
vbmgg1oeBFGjRkhDOfoeMs3NXww5nRy+vgIbp2ZeDE5H5lGNF/rESQ2SpccC4FHl
YiQezaxyeZZJzqidRuJAX0QdUknJVHb9/wjB89GNOnsC5dy0L8cGQSc8K05x/SYp
a+vOiEbmC9zu4nKTIsWLxWoE8wGyZxuIof/qxkH5OhkFACT9qhhpWyMG0cyzolnJ
5OYI1tzwGCBqkMDSDZBCs4uLQdVQXdufXgdAozStQQV6CIkWOGANtaeu5PkBWOgf
s/GJI6ZTKu8mGvhnhdPi7cJzUr92UG/UxsJGWZbHNkoTTNqR2jRBEc1NQcE+4syd
2YNbuF7vGVNJ4k4QR0fk89TwmPk89RtIgiJMqfHVB6mc5d4AkPPNsbZmHF3Qjkge
RbBf9Js4ZQ3Wty0I0Or7gozBvv/HEvapESx4UrxGPTI95QVjrh3Mv8rXvwIDAQAB
oz8wPTAdBgNVHQ4EFgQUB1cZuCq/S/z/XJgDe+KW5HnEeGowDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAHU5367TsyiL0ko6
lkMISHcgEZtPT6AzT/wQL73UP3byMud8ZO5qIMnBmyY74bBdgvGM2q+vnkgI8gkp
O8gtOdB2rA1Lj2SWQqH7OHRxrDP5Mkje90faqk6/Jn+FYQs8/eEsCexxpgA1oeHY
+7RpdARK3bvo8WFo2gK1t8gAhLdXsOGibQGb+QEBMOXbLfiLyYhF/SUCG6+4rz9j
ei7CF9FvlQ1JQLdEKGYkIt/Rbzny+NbialAnV0DpHO7os+2GhktqSazLfo3idXwR
6k6ZlYSwVq6alWGZ1qE2fDkAfUgVqwq+vpbRmN0jo7RrEyV3odsLGv73IU3vQU70
v+l0GWDA5h1+tnGr/1bY7T89ESb+wGOzZ4NDayLjkqTKTXE67d2gw6K4ZgQ/5xSX
PEXP9YuFMhaw8ofKPCRAGeWsAyV+iC9LIFE/HHY66NkmNyL4h86BySqAPs7ZcKfL
JrJmdu2OvaPIm9Kxv/JKMti+Nb4DY8akbVk04GtgXgRGpNVryg==
-----END CERTIFICATE-----`
        }
      }
})
module.exports = db