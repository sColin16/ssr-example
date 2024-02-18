import { HistoryManager } from "../historyManager/types"
import { ClientPropsManager } from "../clientPropsManager/types"
import { ClientPropsService } from "../clientProps/types"
import { ClientRouter } from "./types"

export class DefaultRouter<SiteProps> implements ClientRouter {
  constructor(
    private readonly clientPropsService: ClientPropsService<SiteProps>,
    private readonly clientPropsManager: ClientPropsManager<SiteProps>,
    private readonly historyManager: HistoryManager<SiteProps>,
  ) {}

  push = async (path: string) => {
    const { newProps, finalPath } = await this.navigate(path)

    this.historyManager.pushState(finalPath, newProps)
  }

  replace = async (path: string) => {
    const { newProps, finalPath } = await this.navigate(path)

    this.historyManager.replaceState(finalPath, newProps)
  }

  forward = () => {
    this.historyManager.forward()
  }

  back = () => {
    this.historyManager.back()
  }

  go = (delta?: number) => {
    this.historyManager.go(delta)
  }

  private navigate = async (path: string) => {
    const currentProps = this.clientPropsManager.readCurrentProps()

    const { props: updatedProps, finalPath } =
      await this.clientPropsService.fetchPropsFollowRedirects(
        path,
        currentProps,
      )

    const newProps = this.clientPropsManager.updateProps(updatedProps)

    return {
      newProps,
      finalPath,
    }
  }
}
