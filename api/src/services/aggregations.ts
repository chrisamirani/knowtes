import mongoose, { PipelineStage } from "mongoose";

export const notesSearchAgg = (
  queryVector: number[],
  team: string,
  queryWords: string[]
): PipelineStage[] => {
  return [
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: queryVector,
        numCandidates: 150,
        limit: 10,
        filter: {
          team: new mongoose.Types.ObjectId(team),
        },
      },
    },
    {
      $addFields: {
        // Check if any query word is in the title or body and assign a score
        matchedScore: {
          $cond: {
            if: {
              $gt: [
                {
                  $size: {
                    $filter: {
                      input: queryWords,
                      as: "word",
                      cond: {
                        $or: [
                          {
                            $regexMatch: {
                              input: "$title",
                              regex: "$$word",
                              options: "i",
                            },
                          },
                          {
                            $regexMatch: {
                              input: "$plainBody",
                              regex: "$$word",
                              options: "i",
                            },
                          },
                        ],
                      },
                    },
                  },
                },
                0,
              ],
            },
            then: 1, // Higher score if any word is matched
            else: 0,
          },
        },
      },
    },
    {
      $project: {
        title: 1,
        matchedScore: 1,
        vectorScore: {
          $meta: "vectorSearchScore",
        },
      },
    },
    {
      $sort: { matchedScore: -1, vectorScore: -1 },
    },
  ];
};
