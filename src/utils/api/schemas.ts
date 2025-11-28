import * as v from "valibot";

export const VideoSchema = v.object({
  nextPageToken: v.string(),
  pageInfo: v.object({
    totalResults: v.number(),
  }),
  items: v.array(
    v.object({
      id: v.object({
        videoId: v.string(),
      }),
      snippet: v.object({
        publishedAt: v.string(),
        title: v.string(),
        thumbnails: v.object({
          default: v.object({
            url: v.string(),
            width: v.number(),
            height: v.number(),
          }),
          medium: v.object({
            url: v.string(),
            width: v.number(),
            height: v.number(),
          }),
          high: v.object({
            url: v.string(),
            width: v.number(),
            height: v.number(),
          }),
        }),
        channelTitle: v.string(),
      }),
    })
  ),
});

export const VideoStatisticsSchema = v.object({
  items: v.array(
    v.object({
      id: v.string(),
      snippet: v.object({
        channelTitle: v.string(),
        title: v.string(),
        description: v.string(),
      }),
      statistics: v.object({
        viewCount: v.string(),
        likeCount: v.string(),
      }),
    })
  ),
});
