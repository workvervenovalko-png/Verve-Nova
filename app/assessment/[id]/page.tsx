import { getAssessmentState } from "@/app/actions/assessment";
import { getQuestionsForRole } from "@/lib/assessment-questions";
import AssessmentClient from "./AssessmentClient";

export const dynamic = "force-dynamic";

export default async function AssessmentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const stateRes = await getAssessmentState(resolvedParams.id);

  if (!stateRes.success) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">ACCESS DENIED</h1>
        <p className="text-white/40 uppercase tracking-widest text-sm max-w-md">{stateRes.error}</p>
      </div>
    );
  }

  const { candidateName, roleSlug, assessment } = stateRes.data as any;

  if (assessment.status === 'Completed') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-black text-emerald-400 uppercase tracking-tighter mb-4">ASSESSMENT SUBMITTED</h1>
        <p className="text-white/40 uppercase tracking-widest text-sm max-w-md">You have successfully completed the assessment. You may close this window. Please wait for further communication.</p>
      </div>
    );
  }

  const allQuestions = getQuestionsForRole(roleSlug);
  // Strip out correct options before sending to client to prevent cheating
  const safeQuestions = allQuestions.map(({ correctOptionIndex, ...q }) => q);

  return (
    <AssessmentClient 
      appId={resolvedParams.id} 
      candidateName={candidateName} 
      roleSlug={roleSlug} 
      questions={safeQuestions} 
      initialStatus={assessment.status}
      startedAt={assessment.startedAt}
    />
  );
}
