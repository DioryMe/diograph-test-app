import { DiographStore } from "diograph-store"
import { DiographAuthentication } from "diograph-authentication"

// DiographStore.setAuthToken("test-token")
DiographStore.setAuthToken(DiographAuthentication.token);

try {
DiographStore.get("5691").then((diory) => {
  console.log(diory)
})
} catch(e) {
  console.log(e)
}
