import { ProfileScreen } from "@/components/custom/profile-screen";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export default function TermsOfServiceScreen() {
  return (
    <ProfileScreen title="Privacy Policy">
        <VStack space="lg" className="pb-8">

          {/* Header Section */}
          <VStack space="xs">
            <Heading className="text-3xl font-bold text-slate-900">
              Privacy Policy
            </Heading>
            <Text className="text-slate-500 italic">
              Effective Date: 09 October 2025
            </Text>
            <Text className="text-slate-700 font-medium">
              Seek IT Ltd, incorporated in Scotland, United Kingdom
            </Text>
          </VStack>

          <Divider className="my-2" />

          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              Introduction
            </Heading>
            <Text className="text-slate-700 leading-6">
              Seek IT Ltd (“Seek,” “we,” “us,” or “our”) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use the Seek mobile application or website (the “Platform”). By using Seek, you agree to this Privacy Policy.
            </Text>
          </VStack>

          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              Information We Collect
            </Heading>

            <Box className="ml-2">
              <Text className="font-semibold text-slate-800 mb-1">a. Information You Provide</Text>
              <VStack space="xs" className="pl-4">
                <Text className="text-slate-700">• Your name and university email address</Text>
                <Text className="text-slate-700">• Your student status and university affiliation</Text>
                <Text className="text-slate-700">• Property listings or descriptions</Text>
                <Text className="text-slate-700">• Communications with Seek (feedback, support requests)</Text>
              </VStack>
            </Box>

            <Box className="ml-2">
              <Text className="font-semibold text-slate-800 mb-1">b. Automatically Collected Information</Text>
              <VStack space="xs" className="pl-4">
                <Text className="text-slate-700">• Device information (model, OS, IP address)</Text>
                <Text className="text-slate-700">• Usage data (pages viewed, interactions)</Text>
                <Text className="text-slate-700">• Log data (crash reports, technical diagnostics)</Text>
                <Text className="text-slate-700">• Cookies and similar technologies for session management</Text>
              </VStack>
            </Box>

            <Box className="ml-2">
              <Text className="font-semibold text-slate-800 mb-1">c. Optional Data</Text>
              <VStack space="xs" className="pl-4">
                <Text className="text-slate-700">• Approximate or precise location data</Text>
                <Text className="text-slate-700">• Group data (if you create or join a housing group)</Text>
              </VStack>
            </Box>
          </VStack>

          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              How We Use Your Information
            </Heading>
            <VStack space="xs" className="ml-2">
              <Text className="text-slate-700">• Create and manage your account</Text>
              <Text className="text-slate-700">• Display, personalise, and recommend housing listings</Text>
              <Text className="text-slate-700">• Facilitate communication between students and landlords</Text>
              <Text className="text-slate-700">• Improve Seek’s functionality, performance, and reliability</Text>
              <Text className="text-slate-700">• Conduct internal analytics and generate anonymised reports</Text>
              <Text className="text-slate-700">• Maintain the security and integrity of the Platform</Text>
            </VStack>
            <Box>
              <Text className="text-slate-700">
                Seek does not sell, rent, or share your personal information. However, Seek may sell aggregated and anonymised analytical reports based on user activity data. These reports never contain identifiable personal information.
              </Text>
            </Box>
          </VStack>


          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              Legal Basis for Processing (UK GDPR)
            </Heading>
            <VStack space="xs" className="ml-2">
              <Text className="text-slate-700">• Contractual necessity: to provide Seek’s services.</Text>
              <Text className="text-slate-700">• Legitimate interests: to analyse usage data and develop aggregated reports.</Text>
              <Text className="text-slate-700">• Consent: when you opt in to location sharing or marketing communications.</Text>
            </VStack>
          </VStack>

          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              Data Sharing
            </Heading>
            <VStack space="xs" className="ml-2">
              <Text className="text-slate-700">• Service providers that help us operate Seek (hosting, analytics, crash reporting).</Text>
              <Text className="text-slate-700">• Business partners or research institutions in the form of anonymised, aggregated insights.</Text>
              <Text className="text-slate-700">• Regulators or authorities where required by law.</Text>
            </VStack>
            <Box>
              <Text className="text-slate-700">
                Seek never provides partners with personally identifiable information (PII) without your explicit consent.
              </Text>
            </Box>
          </VStack>

          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              Data Retention
            </Heading>
            <VStack space="xs" className="ml-2">
              <Text className="text-slate-700">• Account data is kept while your account remains active.</Text>
              <Text className="text-slate-700">• Usage data used for analytics may be anonymised and retained for long-term insights.</Text>
              <Text className="text-slate-700">• You can request deletion of your data or account at any time (see Section 9).</Text>
            </VStack>
          </VStack>

          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              Data Security
            </Heading>
            <Box>
              <Text className="text-slate-700">
                We apply technical and organisational measures to safeguard your data, including encryption, secure servers, and restricted access. No system is completely secure, but we continuously monitor and improve our protections.
              </Text>
            </Box>
          </VStack>

          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              Data Security
            </Heading>
            <Box>
              <Text className="text-slate-700">
                Seek uses cookies and analytics tools (including Firebase and similar services) to collect anonymised usage data and improve app performance. You can disable cookies in your device or browser settings, but some features may stop working properly.
              </Text>
            </Box>
          </VStack>

          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              Your Rights (UK & EU Users)
            </Heading>
            <VStack space="xs" className="ml-2">
              <Text className="text-slate-700">• Access your personal data</Text>
              <Text className="text-slate-700">• Correct or update inaccurate information</Text>
              <Text className="text-slate-700">• Request deletion (“right to be forgotten”)</Text>
              <Text className="text-slate-700">• Restrict or object to data processing</Text>
              <Text className="text-slate-700">• Withdraw consent for optional features</Text>
            </VStack>
            <Box>
              <Text className="text-slate-700">
                Requests can be made via privacy@seekapp.uk.
              </Text>
            </Box>
          </VStack>

          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              Children’s Privacy
            </Heading>
            <Box>
              <Text className="text-slate-700">
                Seek is designed for university students. We do not knowingly collect data from individuals under 16 years old.
              </Text>
            </Box>
          </VStack>

          <VStack space="md">
            <Heading size="md" className="font-bold text-slate-900">
              Changes to This Policy
            </Heading>
            <Box>
              <Text className="text-slate-700">
                We may update this Privacy Policy from time to time. Users will be notified of any significant changes. Continued use of Seek after changes are made means you accept the updated version.
              </Text>
            </Box>
          </VStack>

          {/* 4. Contact Us */}
          <VStack space="md" className="mt-4">
            <Heading size="md" className="font-bold text-slate-900">
              Contact Us
            </Heading>
            <Box className="rounded-2xl border border-primary-500 bg-transparent p-4">
              <Text className="font-bold text-slate-800">Seek IT Ltd</Text>
              <Text className="text-slate-700">Email: privacy@seekapp.uk</Text>
              <Text className="text-slate-700">11 Crail’s Lane, KY16 9NR, Scotland</Text>
            </Box>
          </VStack>

        </VStack>
    </ProfileScreen>
  );
}
