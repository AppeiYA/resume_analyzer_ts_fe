interface AnalysisResultProps {
  data: {
    overall_score: number;
    summary: string;
    report_details: {
      strengths: string[];
      weaknesses: string[];
      skills_found: string[];
    };
  } | null;
}

export default function AnalysisResult({ data }: AnalysisResultProps) {
  if (!data) return <p className="text-gray-500">No analysis available.</p>;

  return (
    <section className="mt-8">
      <table className="w-full text-left border-collapse">
        <thead className="text-xl font-bold">
          <tr>
            <th className="pb-4 text-green-500">Analysis Result</th>
            <th
              className={`pb-4 text-right ${
                data.overall_score > 50 ? "text-green-500" : "text-red-500"
              }`}
            >
              Score: {data.overall_score}%
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-transparent">
          <tr>
            <td colSpan={2} className="py-4 align-top">
              <span className="font-semibold block mb-1">Summary</span>
              <p className="text-white/70 leading-relaxed">{data.summary}</p>
            </td>
          </tr>
          <tr>
            <td className="py-4 pr-4 align-top w-1/2">
              <span className="font-semibold text-green-700 block mb-2">
                Strengths
              </span>
              <ul className="list-disc list-inside text-white/70 space-y-1">
                {data.report_details.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </td>
            <td className="py-4 align-top w-1/2">
              <span className="font-semibold text-red-700 block mb-2">
                Areas for Improvement
              </span>
              <ul className="list-disc list-inside text-white/70 space-y-1">
                {data.report_details.weaknesses.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="py-4 align-top">
              <span className="font-semibold block mb-2">
                Technical Skills Identified
              </span>
              <div className="flex flex-wrap gap-2">
                {data.report_details.skills_found.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
