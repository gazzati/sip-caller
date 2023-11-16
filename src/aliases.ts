import moduleAlias from "module-alias"

moduleAlias.addAliases({
  "@root": `${__dirname}/`,
  "@database": `${__dirname}/database`,
  "@interfaces": `${__dirname}/interfaces`,
  "@processes": `${__dirname}/processes`,
  "@scopes": `${__dirname}/scopes`,
  "@services": `${__dirname}/services`,
})
