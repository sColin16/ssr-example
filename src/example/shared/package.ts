import { buildSharedPackage } from "library/shared/package"
import { exampleClientPropsService } from "./service/clientProps"

export const {
  ClientProvider,
  Link,
  useNavigate,
  buildAggregateSubscribedComponent,
  buildSubscribedComponent,
} = buildSharedPackage(exampleClientPropsService)
