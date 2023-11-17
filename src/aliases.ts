import moduleAlias from "module-alias"

moduleAlias.addAliases({
  "@root": `${__dirname}/`,
  "@api": `${__dirname}/api`,
  "@database": `${__dirname}/database`,
  "@interfaces": `${__dirname}/interfaces`,
  "@processes": `${__dirname}/processes`,
  "@scopes": `${__dirname}/scopes`,
  "@services": `${__dirname}/services`,
})
