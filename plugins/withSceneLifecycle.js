// iOS 27 SDK crashes apps that do not adopt the UIScene lifecycle; Expo SDK 54 has no option for it.
const { withAppDelegate, withInfoPlist } = require("expo/config-plugins");

const MARKER = "class SceneDelegate";

// React Native keeps starting in didFinishLaunching (expo-dev-launcher needs the window there);
// the scene only adopts that window and forwards links to the AppDelegate handlers.
const SCENE_DELEGATE = `
// Added by plugins/withSceneLifecycle.js
class SceneDelegate: UIResponder, UIWindowSceneDelegate {
  var window: UIWindow?

  func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
    guard let windowScene = scene as? UIWindowScene,
          let window = (UIApplication.shared.delegate as? AppDelegate)?.window else { return }
    window.windowScene = windowScene
    window.makeKeyAndVisible()
    self.window = window
    self.scene(scene, openURLContexts: connectionOptions.urlContexts)
    if let activity = connectionOptions.userActivities.first {
      self.scene(scene, continue: activity)
    }
  }

  func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    for context in URLContexts {
      _ = UIApplication.shared.delegate?.application?(UIApplication.shared, open: context.url, options: [:])
    }
  }

  func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
    _ = UIApplication.shared.delegate?.application?(UIApplication.shared, continue: userActivity, restorationHandler: { _ in })
  }
}
`;

module.exports = function withSceneLifecycle(config) {
  config = withInfoPlist(config, (cfg) => {
    cfg.modResults.UIApplicationSceneManifest = {
      UIApplicationSupportsMultipleScenes: false,
      UISceneConfigurations: {
        UIWindowSceneSessionRoleApplication: [
          {
            UISceneConfigurationName: "Default Configuration",
            UISceneDelegateClassName: "$(PRODUCT_MODULE_NAME).SceneDelegate",
          },
        ],
      },
    };
    return cfg;
  });
  return withAppDelegate(config, (cfg) => {
    if (cfg.modResults.language !== "swift") {
      throw new Error("withSceneLifecycle: only a Swift AppDelegate is supported");
    }
    if (!cfg.modResults.contents.includes(MARKER)) {
      cfg.modResults.contents += SCENE_DELEGATE;
    }
    return cfg;
  });
};
