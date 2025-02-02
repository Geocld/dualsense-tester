import { type Component, defineAsyncComponent } from 'vue'
import { BaseDeviceRouter, type CustomPanelItem, type DeviceItem } from '../../device-based-router/shared'
import { checkConnectionType, PRODUCT_ID_DUALSENSE_EDGE, USAGE_ID_GD_GAME_PAD, USAGE_PAGE_GENERIC_DESKTOP, VENDOR_ID_SONY } from '../../utils/dualsense/ds.util'

const ConnectPanel = defineAsyncComponent(() => import('./views/ConnectPanel.vue'))
const OutputPanel = defineAsyncComponent(() => import('./views/OutputPanel.vue'))
const ModelPanel = defineAsyncComponent(() => import('./views/ModelPanel.vue'))
const ProfileWidget = defineAsyncComponent(() => import('./views/ProfileWidget.vue'))
const GyroView = defineAsyncComponent(() => import('./views/_visualizerPanel/GyroView.vue'))
const AccelView = defineAsyncComponent(() => import('./views/_visualizerPanel/AccelView.vue'))

export default class DualSenseEdgeRouter extends BaseDeviceRouter {
  name = 'dualsense-edge'
  filters = [
    {
      vendorId: VENDOR_ID_SONY,
      productId: PRODUCT_ID_DUALSENSE_EDGE,
      usagePage: USAGE_PAGE_GENERIC_DESKTOP,
      usage: USAGE_ID_GD_GAME_PAD,
    },
  ]

  match(device: HIDDevice): boolean {
    if (device.vendorId === VENDOR_ID_SONY && device.productId === PRODUCT_ID_DUALSENSE_EDGE) {
      return true
    }
    return false
  }

  getDeviceItem(device: HIDDevice): DeviceItem {
    return {
      deviceName: device.productName,
      connectionType: checkConnectionType(device),
      device,
    }
  }

  connectPanel(deviceItem: DeviceItem): Component {
    return ConnectPanel
  }

  modelPanel(deviceItem: DeviceItem): Component {
    return ModelPanel
  }

  widgetPanels(deviceItem: DeviceItem): CustomPanelItem[] | undefined {
    return [
      {
        title: {
          key: 'output_panel.title',
        },
        component: OutputPanel,
      },
      {
        title: { key: 'profile_panel.title' },
        tag: 'WIP',
        component: ProfileWidget,
      },
    ]
  }

  visualizerPanels(deviceItem: DeviceItem): CustomPanelItem[] {
    return [
      {
        title: {
          key: 'info_panel.title_gyroscope',
        },
        component: GyroView,
      },
      {
        title: {
          key: 'info_panel.title_accelerometer',
        },
        component: AccelView,
      },
    ]
  }
}
