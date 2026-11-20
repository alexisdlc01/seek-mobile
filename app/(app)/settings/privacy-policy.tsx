import { ProfileScreen } from "@/components/custom/profile-screen";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

const Bullet = ({ children }: { children: string }) => <Text className="text-slate-700">• {children}</Text>;

const RetentionRow = ({ information, retention }: { information: string; retention: string }) => (
  <Box className="border-b border-slate-200 pb-3">
    <Text className="font-semibold text-slate-800">{information}</Text>
    <Text className="text-slate-700">{retention}</Text>
  </Box>
);

export default function PrivacyPolicyScreen() {
  return (
    <ProfileScreen title="Privacy Policy">
      <VStack space="lg" className="pb-8">
        <VStack space="xs">
          <Heading className="text-3xl font-bold text-slate-900">Privacy Policy</Heading>
          <Text className="text-slate-500 italic">Last updated: 17 November 2026</Text>
          <Text className="text-slate-700 font-medium">Seek IT Ltd, incorporated in Scotland, United Kingdom</Text>
        </VStack>

        <Divider className="my-2" />

        <VStack space="md">
          <Heading size="md" className="font-bold text-slate-900">Introduction</Heading>
          <Text className="text-slate-700 leading-6">
            Seek IT Ltd (“Seek”, “we”, “us” or “our”) is responsible for the personal information used by the Seek website and mobile app. This policy explains what we collect, why we use it, who helps us process it, how long we keep it and your rights.
          </Text>
        </VStack>

        <VStack space="md">
          <Heading size="md" className="font-bold text-slate-900">Information we collect</Heading>
          <VStack space="xs" className="ml-2">
            <Bullet>Account and profile details, including your name, contact details, university and student status.</Bullet>
            <Bullet>Applications, property listings, tenancy records, contracts, deposits, payments, documents, photos and messages.</Bullet>
            <Bullet>Device, IP address, usage, cookie, crash and security information.</Bullet>
            <Bullet>Optional location, household and connected-mailbox information.</Bullet>
          </VStack>
        </VStack>

        <VStack space="md">
          <Heading size="md" className="font-bold text-slate-900">Connected mailboxes</Heading>
          <Text className="text-slate-700 leading-6">
            If you connect Gmail, Microsoft or another mailbox through IMAP, Seek first checks message headers and reads only messages identified as housing-related. We use those messages to show housing conversations and file relevant tenancy documents or bills.
          </Text>
          <Text className="text-slate-700 leading-6">
            Imported housing messages and mailbox credentials are encrypted at rest. Disconnecting a mailbox deletes its imported messages and immediately deletes or revokes its access token or IMAP credential. We do not use mailbox data for advertising or to train general-purpose AI models.
          </Text>
          <Text className="text-slate-700 leading-6">
            Seek’s use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.
          </Text>
        </VStack>

        <VStack space="md">
          <Heading size="md" className="font-bold text-slate-900">How and why we use information</Heading>
          <VStack space="xs" className="ml-2">
            <Bullet>To provide accounts, applications, tenancies, payments and communications where needed to perform our contract with you.</Bullet>
            <Bullet>To meet legal, accounting, fraud-prevention and safety obligations.</Bullet>
            <Bullet>For service security, support and improvement where our legitimate interests do not override your rights.</Bullet>
            <Bullet>For optional mailbox, location or marketing features where you consent; you can withdraw consent at any time.</Bullet>
          </VStack>
          <Text className="text-slate-700">Seek does not sell personal information. Any anonymous, aggregated analysis does not identify you.</Text>
        </VStack>

        <VStack space="md">
          <Heading size="md" className="font-bold text-slate-900">Who processes or receives information</Heading>
          <VStack space="xs" className="ml-2">
            <Bullet>Stripe for card payments, deposits and landlord payouts. Stripe may act independently for identity checks and fraud prevention.</Bullet>
            <Bullet>Google Gmail API, Microsoft and relevant IMAP mailbox providers for mailbox connections.</Bullet>
            <Bullet>Google Firebase for app notifications and, where enabled, analytics and crash reporting.</Bullet>
            <Bullet>Render for application hosting, AWS S3 for private file storage, and our email provider for service emails.</Bullet>
            <Bullet>Students, household members, landlords or agents where sharing is necessary for an application or tenancy.</Bullet>
            <Bullet>Deposit schemes, regulators, courts or authorities where required by the service or law.</Bullet>
          </VStack>
          <Text className="text-slate-700 leading-6">
            Some providers process information outside the UK. Where required, we use recognised safeguards such as UK contractual clauses, the UK-US data bridge or another lawful transfer mechanism.
          </Text>
        </VStack>

        <VStack space="md">
          <Heading size="md" className="font-bold text-slate-900">How long we keep information</Heading>
          <VStack space="sm" className="ml-2">
            <RetentionRow information="Payment and accounting records" retention="6 years after the relevant financial year" />
            <RetentionRow information="Tenancy records, contracts, payments, tenancy messages, inventories and photos" retention="6 years after the tenancy ends" />
            <RetentionRow information="Imported emails and other non-tenancy messages" retention="Deleted on mailbox disconnect or within 30 days of account deletion" />
            <RetentionRow information="Mailbox tokens and IMAP credentials" retention="Deleted or revoked immediately on disconnect or account deletion" />
            <RetentionRow information="Identity documents" retention="Deleted 30 days after you last share them with a landlord, or as soon as you replace them or close your account" />
          </VStack>
          <Text className="text-slate-700">Stripe may keep its own regulated records under its privacy policy. Backups expire through our normal secure rotation.</Text>
        </VStack>

        <VStack space="md">
          <Heading size="md" className="font-bold text-slate-900">Security</Heading>
          <Text className="text-slate-700 leading-6">
            We use encryption, access controls, restricted staff access, logging and secure hosting to protect information. No service can guarantee complete security, but we review and improve these controls.
          </Text>
        </VStack>

        <VStack space="md">
          <Heading size="md" className="font-bold text-slate-900">Your rights and deleting your account</Heading>
          <Text className="text-slate-700 leading-6">
            You may ask to access, correct, erase, restrict or receive your information, object to certain uses, or withdraw consent. You can also complain to the UK Information Commissioner’s Office.
          </Text>
          <Text className="text-slate-700 leading-6">
            To delete your account, sign in, open Edit profile, select Close account, then confirm. We may first require an active tenancy or outstanding payment to be completed. You can also email privacy@seekapp.uk. Records we must keep for legal or dispute purposes remain only for the periods above.
          </Text>
        </VStack>

        <VStack space="md">
          <Heading size="md" className="font-bold text-slate-900">Children’s privacy</Heading>
          <Text className="text-slate-700">Seek is designed for university students. We do not knowingly collect personal information from anyone under 16.</Text>
        </VStack>

        <VStack space="md">
          <Heading size="md" className="font-bold text-slate-900">Changes to this policy</Heading>
          <Text className="text-slate-700">We may update this policy and will tell users about significant changes through Seek or by email.</Text>
        </VStack>

        <VStack space="md" className="mt-4">
          <Heading size="md" className="font-bold text-slate-900">Contact us</Heading>
          <Box className="rounded-2xl border border-primary-500 bg-transparent p-4">
            <Text className="font-bold text-slate-800">Seek IT Ltd</Text>
            <Text className="text-slate-700">Email: privacy@seekapp.uk</Text>
            <Text className="text-slate-700">Registered office: 11 Crail’s Lane, KY16 9NR, Scotland, United Kingdom</Text>
          </Box>
        </VStack>
      </VStack>
    </ProfileScreen>
  );
}
