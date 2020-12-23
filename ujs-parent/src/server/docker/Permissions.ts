

interface Permissions {
    directories: {
        [name: string]: string
    },
    ports: number[]
}

export default Permissions;