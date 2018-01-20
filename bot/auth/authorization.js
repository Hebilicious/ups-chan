//Mom&Dad,WeebOverlords,Lider,Test
export const authorizedRolesIds = [
  "312317944417878016",
  "341182224139419650",
  "316283334768459777",
  "248702697610412032"
]

export function checkMemberForRolesIds(member, rolesIds) {
  return member.roles.some(r => rolesIds.includes(r.id)) ? true : false
}
