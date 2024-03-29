import facebookSvg from "@/images/icons/Facebook.svg";
import googleSvg from "@/images/icons/Google.svg";
import twitterSvg from "@/images/icons/Twitter.svg";

// Define the keys (or network names) we will use to identify each platform.
export type NetworkKey = keyof typeof networkDefaults;

// The type structure for a single network.
export type Network = {
  id: string; // The identifier for the network (e.g., "youtube")
  url: string; // Complete URL leading to the specific profile or page
  label: string; // Display name for the platform (e.g., "YouTube")
  IconComponent: React.ComponentType<{ className?: string }>; // React component for the platform's icon
};

// Default settings for each platform. It includes the base URL, display name, and icon.
export const networkDefaults: Record<
  string,
  {
    baseUrl: string;
    label: string;
    IconComponent: React.ComponentType<{ className?: string }>;
  }
> = {
  youtube: {
    label: "YouTube",
    IconComponent: googleSvg,
    baseUrl: "https://youtube.com/",
  },
  facebook: {
    label: "Facebook",
    IconComponent: facebookSvg,
    baseUrl: "https://facebook.com/",
  },
  twitter: {
    label: "X (formerly known as Twitter)",
    IconComponent: twitterSvg,
    baseUrl: "https://x.com/",
  },
  instagram: {
    label: "instagram",
    IconComponent: twitterSvg,
    baseUrl: "https://instagram.com/",
  },
};

/**
 * A helper function to generate the final social networks list.
 * It matches input network keys with our default settings and generates URLs.
 * If an unknown network key is found, it collects them for an error message.
 */
export const networks = (
  input: Partial<Record<NetworkKey, string>>,
): Network[] => {
  // Array to collect invalid/unknown network keys.
  const invalidKeys: string[] = [];

  // Construct the networks array by matching input with our default settings.
  const networks: any = Object.entries(input) // !?!
    .map(([key, value]) => {
      const networkConfig = networkDefaults[key as NetworkKey];

      if (!networkConfig) {
        invalidKeys.push(key);
        return null; // placeholder value; will be filtered out later
      }

      const { baseUrl, label, IconComponent } = networkConfig;
      return {
        id: key,
        url: `${baseUrl}${value}`,
        IconComponent,
        label,
      };
    })
    .filter(Boolean); // this will filter out null values, which are placeholders for invalid keys

  // If any unknown network keys were found, throw an error.
  if (invalidKeys.length) {
    throw new Error(
      `Unknown social network key (app.ts): ${invalidKeys.join(", ")}`,
    );
  }

  return networks;
};
