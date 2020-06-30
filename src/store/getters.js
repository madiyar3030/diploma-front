let getters = {
    // ----------------LIST-------------
    TRANSPORTS: (state) => state.lists.transports,
    TRANSPORTS2: (state) => state.lists.transports2,
    TRANSPORT_TYPES: (state) => state.lists.transport_types,
    MATERIALS: (state) => state.lists.materials,
    MATERIAL_TYPES: (state) => state.lists.material_types,
    COUNT_TYPES: (state) => state.lists.count_types,
    CITIES: (state) => state.lists.cities,
    OPTIONS: (state) => state.lists.options,
    REGIONS: (state) => state.lists.regions,
    API_TOKEN: (state) => state.lists.api_token,
    

    // ---------------LOCAL-------------------
    AUTH: (state) => state.local.auth,
    TOKEN: (state) => state.local.token,
    TYPE: (state) => state.local.type,
    
    
    // ---------------ORDER--------------------
    LISTS: (state) => state.orders.lists,
    ORDER: (state) => state.orders.order,
    OFFERS: (state) => state.orders.offers,
    CLIENT: (state) => state.orders.client,
    DRIVER: (state) => state.orders.driver,
    ACTIVE: (state) => state.orders.active,


    // ---------------CHATS----------------------
    CHATS: (state) => state.chats.chats,
    MESSAGES: (state) => state.chats.messages,
    GROUPS: (state) => state.chats.groups,
    GROUP: (state) => state.chats.group,
    GROUP_INFO: (state) => state.chats.group_info,
}
export default getters