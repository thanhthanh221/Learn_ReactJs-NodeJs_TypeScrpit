import { cleanEnv } from "envalid"
import { str } from "envalid/dist/validators"

const validiateEnv = () => {
    cleanEnv(process.env, {
        NODE_ENV: str(),
        MONGODB_URI: str()
    })
}

export default validiateEnv;