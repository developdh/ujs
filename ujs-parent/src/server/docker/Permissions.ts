

interface Permissions {
    directories: {
        [name: string]: string
    },
    ports: number[],
    openExplorerPerm: boolean
}

export default Permissions;