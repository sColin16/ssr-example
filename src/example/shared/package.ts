import { buildSharedPackage } from "library/shared/package"
import { exampleClientPropsService } from "./service/clientProps"

export const {
  ClientPropsManagerContext,
  Link,
  useNavigate,
  buildAggregateSubscribedComponent,
  buildSubscribedComponent,
} = buildSharedPackage(exampleClientPropsService)
