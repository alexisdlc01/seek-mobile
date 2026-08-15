import { ProfileScreen } from "@/components/custom/profile-screen";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export default function TermsOfServiceScreen() {
  return (
    <ProfileScreen title="Terms of Service">
        <VStack space="lg" className="pb-8">

          {/* Header Section */}
          <VStack space="xs">
            <Heading className="text-3xl font-bold text-slate-900">
              Terms & Conditions
            </Heading>
            <Text className="text-slate-500 italic">
              Effective Date: October 6, 2025
            </Text>
            <Text className="text-slate-700 font-medium">
              Seek IT Ltd, incorporated in Scotland, United Kingdom
            </Text>
          </VStack>

          <Divider className="my-2" />

          {/* Introduction */}
          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              Introduction & Acceptance
            </Heading>
            <Text className="text-slate-700 leading-6">
              These Terms & Conditions (“Terms”) govern your use of the Seek mobile application and website (the “Platform”). By creating an account or using Seek, you agree to be bound by these Terms. Seek IT Ltd (“Seek,” “we,” “us,” “our”) provides a platform to help students discover and connect with private housing options. Seek does not process rental payments, manage contracts, or act as a landlord or tenant. These Terms apply to all users of the Platform, including students, landlords, and agents. If you do not agree with these Terms, you must not use Seek.
            </Text>
          </VStack>

          {/* Scope */}
          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              Scope & Governing Law
            </Heading>
            <Text className="text-slate-700 leading-6">
              Seek is currently available only within the United Kingdom. These Terms are governed by the laws of Scotland. Any disputes will fall under the exclusive jurisdiction of the Scottish courts.
            </Text>
          </VStack>

          {/* User Accounts */}
          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              User Accounts
            </Heading>
            <VStack space="sm" className="pl-2">
              <Text className="text-slate-700">• Accounts are available only to students who register using a valid university email address.</Text>
              <Text className="text-slate-700">• You must provide accurate and truthful information when creating and maintaining your account.</Text>
              <Text className="text-slate-700">• You are responsible for all activity carried out under your account.</Text>
              <Text className="text-slate-700">• You may not impersonate another person or misrepresent your status as a student.</Text>
            </VStack>
          </VStack>

          {/* Liability */}
          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              Landlords & Agents
            </Heading>
            <VStack space="sm" className="pl-2">
              <Text className="text-slate-700">• Landlords and letting agents may publish listings on Seek free of charge.</Text>
              <Text className="text-slate-700">• All listing information (rent, features, availability, photos) must be accurate and not misleading.</Text>
              <Text className="text-slate-700">• Content that is discriminatory, offensive, unlawful, or otherwise inappropriate is strictly prohibited.</Text>
            </VStack>
          </VStack>

          {/* Liability */}
          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              Limitation of Liability
            </Heading>
            <VStack space="sm" className="pl-2">
              <Text className="text-slate-700">• Seek is a discovery and connection tool only. We are not a party to any lease, tenancy, or rental agreement between students and landlords.</Text>
              <Text className="text-slate-700">• Seek does not guarantee the quality, safety, legality, availability, or suitability of any property listed.</Text>
              <Text className="text-slate-700">• Seek is not liable for disputes, damages, losses, or costs arising out of interactions between students and landlords.</Text>
            </VStack>
          </VStack>

          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              Content & Moderation
            </Heading>
            <VStack space="sm" className="pl-2">
              <Text className="text-slate-700">• Prohibited content includes (but is not limited to): false or misleading information, discriminatory remarks, illegal material, offensive language, and inappropriate images.
              </Text>
              <Text className="text-slate-700">• Users may report content or accounts that violate these Terms.</Text>
              <Text className="text-slate-700">• Seek reserves the right to remove any content or suspend accounts at its discretion.</Text>
            </VStack>
          </VStack>

          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              Suspension & Termination
            </Heading>
            <VStack space="sm" className="pl-2">
              <Text className="text-slate-700">• We may suspend or terminate any account at any time if a user violates these Terms or misuses the Platform.</Text>
              <Text className="text-slate-700">• Suspension or termination may occur without prior notice.</Text>
            </VStack>
          </VStack>

          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              Intellectual Property
            </Heading>
            <VStack space="sm" className="pl-2">
              <Text className="text-slate-700">• Seek owns all rights to the Platform, including its design, codebase, branding, and trademarks.</Text>
              <Text className="text-slate-700">• Users are granted a limited, non-transferable, non-exclusive licence to use the Platform for personal purposes.</Text>
              <Text className="text-slate-700">• Content uploaded by landlords and agents (such as property descriptions and photos) remains their property, but by uploading it they grant Seek the right to use, display, and promote such content within the Platform and in related marketing.</Text>
            </VStack>
          </VStack>


          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              Data & Privacy
            </Heading>
            <VStack space="sm" className="pl-2">
              <Text className="text-slate-700">• By using Seek, you consent to the collection and analysis of your data for the purposes of improving the Platform and generating internal insights.</Text>
              <Text className="text-slate-700">• Seek will not sell or share your personal data with third parties without your consent.</Text>
              <Text className="text-slate-700">• Data may be anonymised and used for statistical or operational purposes.</Text>
            </VStack>
          </VStack>

          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              Dispute Resolution
            </Heading>
            <VStack space="sm" className="pl-2">
              <Text className="text-slate-700">• These Terms are governed by the laws of Scotland.</Text>
              <Text className="text-slate-700">• The courts of Scotland shall have exclusive jurisdiction over any dispute arising from or in connection with these Terms.</Text>
            </VStack>
          </VStack>

          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              Changes to Terms
            </Heading>
            <Text className="text-slate-700 leading-6">
              Seek reserves the right to update these Terms at any time. Users will be notified of significant changes. Continued use of the Platform after changes are made constitutes acceptance of the revised Terms.
            </Text>
          </VStack>
        </VStack>
    </ProfileScreen>
  );
}
