import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const archive = mutation({
  args: {
    userId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not Authenticated!");
    const id = identity.subject;
    const existintDocument = await ctx.db.get(args.userId);
    if (!existintDocument) throw new Error("No such document found!!");
    if (existintDocument.userId !== id) throw new Error("Not Authorized!!");
    const recuriveArchive = async (Id: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) => {
          return q.eq("userId", id).eq("parentDocuments", Id);
        })
        .collect();

      for (const it of children) {
        await ctx.db.patch(it._id, {
          isArchived: true,
        });
        await recuriveArchive(it._id);
      }
    };
    const document = await ctx.db.patch(args.userId, {
      isArchived: true,
    });
    recuriveArchive(args.userId);
    return document;
  },
});
export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("User Not Authenticated");
    const userId = identity.subject;
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocuments", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();
    return documents;
  },
});
export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not AUthenticated");
    const userId = identity.subject;
    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocuments: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });
    return document;
  },
});
