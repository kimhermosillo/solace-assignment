import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "../../../db/index";
import { advocates } from "../../../db/schema";

export async function GET(req: NextRequest) {
  const u = new URL(req.url);
  const page = Math.max(1, Number(u.searchParams.get("page")) || 1);
  const pageSize = Math.min(100, Number(u.searchParams.get("pageSize")) || 10);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(advocates);

  const data = await db
    .select()
    .from(advocates)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return NextResponse.json({
    data,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(Number(count) / pageSize)),
  });
}
