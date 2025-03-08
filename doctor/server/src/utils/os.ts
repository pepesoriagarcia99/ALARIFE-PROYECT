import os from "os";
import { Platform } from "../model/Platforms";

export const getPlatform = (): Platform => {
    const platform = os.platform();
    if (platform.startsWith("win")) return Platform.windows;
    if (platform.startsWith("darwin")) return Platform.mac;
    return Platform.linux;
}
