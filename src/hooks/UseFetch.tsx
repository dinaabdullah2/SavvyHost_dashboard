import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Cookies from "js-cookie"

type useFetchPops_TP = {
  queryKey: [string]
  endpoint: string
  enabled?: boolean
  select?: ((data: any) => any) | undefined
  onError?: (err: any) => void
  onSuccess?: (err: any) => void
  localization?: boolean
  useCompanyToken?: boolean
  specificToken?: string
}
function useFetch<T>({
  endpoint,
  enabled,
  select,
  queryKey,
  onError,
  onSuccess,
  localization,
  useCompanyToken,
  specificToken,
}: useFetchPops_TP) {
  const user_token = Cookies.get("token")
  const token = user_token
  const authorizationHeader = `Bearer ${token}`
  const config = {
    headers: { Authorization: authorizationHeader },
  }
  const query = useQuery<T>({
    queryKey,
    queryFn: () =>
      axios
        .get(
          `https://dashboard.savvyhost.io/${endpoint}`,
          config
        )
        .then((res) => res.data),
    enabled,
    select,
    onError,
    onSuccess,
  })
  return query
}

export default useFetch
