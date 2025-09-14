import { Platform } from "react-native";

export const BASE_URL = Platform.OS==='android' ? 'http://10.0.2.2:5000/api' : 'http://localhost:5000/api'
export const SOCKET_URL = Platform.OS==='android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000'
export const GOOGLE_MAP_API_KEY = "MY_MAP_API_KEY"
export const BRANCH_ID  = '68c1a7fda8ebff687b67fc97'