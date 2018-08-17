import * as DB from "../database/database.js"

export function checkMemberForRolesIds(member, rolesIds) {
  return member.roles.some(r => rolesIds.includes(r.id)) ? true : false
}

export async function isPrivileged(member) {
  const conf = await DB.Connect(member.guild)
    .table("configuration")
    .get(0)

  return (
    member.permissions.has("ADMINISTRATOR") ||
    checkMemberForRolesIds(member, conf.adminRolesIds)
  )
}
