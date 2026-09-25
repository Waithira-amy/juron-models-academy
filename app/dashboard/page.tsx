import { PrismaClient } from "@prisma/client";

// Force the page to fetch live data every time it is refreshed so votes are always up to date
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const prisma = new PrismaClient();
  
  // Fetch all nominees from the new Voting table using the bypass
  const nominees = await (prisma as any).voting.findMany({
    orderBy: { votes: 'desc' }
  });

  // Group them dynamically based on what is ACTUALLY in the DB
  // This ensures NO ONE is ever hidden, even if their category is spelled differently!
  const groupedCategories: Record<string, any[]> = {};
  
  nominees.forEach((nominee: any) => {
    const cat = nominee.category || "Uncategorized";
    const title = nominee.title || "Nominee";
    const groupName = `${cat} (${title})`; // e.g., "Machakos- Mavoko (Miss)"
    
    if (!groupedCategories[groupName]) {
      groupedCategories[groupName] = [];
    }
    groupedCategories[groupName].push(nominee);
  });

  // Sort the groups alphabetically
  const sortedGroupNames = Object.keys(groupedCategories).sort();

  // Calculate total platform votes and revenue
  const totalPlatformVotes = nominees.reduce((sum: number, n: any) => sum + (n.votes || 0), 0);
  const totalRevenue = totalPlatformVotes * 10;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 pb-24">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 border-b border-zinc-800 pb-6 mt-8">
          <h1 className="text-3xl font-bold text-amber-500 mb-2">Juron Models Live Leaderboard</h1>
          <div className="flex gap-6 text-sm text-zinc-400">
            <p>Total Votes Cast: <span className="text-white font-bold">{totalPlatformVotes}</span></p>
            <p>Estimated Revenue: <span className="text-emerald-400 font-bold">Ksh {totalRevenue.toLocaleString()}</span></p>
          </div>
        </header>

        {/* Categories Grid */}
        <div className="space-y-12">
          {sortedGroupNames.map((groupName) => (
            <div key={groupName} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-4 border-b border-zinc-800 pb-2">
                {groupName}
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-zinc-500 border-b border-zinc-800">
                      <th className="pb-3 font-medium w-16">Rank</th>
                      <th className="pb-3 font-medium">Nominee Name</th>
                      <th className="pb-3 font-medium">Voting Code</th>
                      <th className="pb-3 font-medium text-right">Total Votes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedCategories[groupName].map((nominee: any, index: number) => (
                      <tr key={nominee.code} className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/30 transition-colors">
                        <td className="py-3 text-zinc-400">#{index + 1}</td>
                        <td className="py-3 font-semibold text-zinc-200">
                          <div className="flex items-center gap-3">
                            {nominee.photoUrl ? (
                              <img src={nominee.photoUrl} alt={nominee.fullName} className="w-8 h-8 rounded-full object-cover border border-zinc-700" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-zinc-500">
                                {nominee.fullName.charAt(0)}
                              </div>
                            )}
                            {nominee.fullName}
                          </div>
                        </td>
                        <td className="py-3 text-zinc-400 font-mono text-xs">{nominee.code}</td>
                        <td className="py-3 text-right">
                          <span className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full font-bold shadow-inner border border-amber-500/20">
                            {nominee.votes || 0}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          
          {sortedGroupNames.length === 0 && (
            <div className="text-center py-20 text-zinc-500 border border-zinc-800 rounded-2xl border-dashed">
              No nominees found in the Voting table. Please check Prisma Studio.
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}