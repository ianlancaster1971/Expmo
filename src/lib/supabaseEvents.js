// All Supabase-specific code lives here, isolated behind dynamic imports so
// it (and the Supabase client library) is only ever downloaded when a
// project is actually configured — see EventsContext.jsx.
import { getSupabase } from "./supabase";
import { seedEvents, seedSiteContent } from "../data/seedData";

const CONTENT_ROW_ID = "home";

function contentToRow(content) {
  return {
    id: CONTENT_ROW_ID,
    hero_eyebrow: content.heroEyebrow,
    hero_title: content.heroTitle,
    hero_subtitle: content.heroSubtitle,
    about_title: content.aboutTitle,
    about_text: content.aboutText,
    ring_labels: content.ringLabels,
  };
}

function rowToContent(row) {
  return {
    heroEyebrow: row.hero_eyebrow,
    heroTitle: row.hero_title,
    heroSubtitle: row.hero_subtitle,
    aboutTitle: row.about_title,
    aboutText: row.about_text,
    ringLabels: row.ring_labels,
  };
}

export async function seedIfEmpty() {
  const supabase = await getSupabase();

  const { count } = await supabase
    .from("events")
    .select("id", { count: "exact", head: true });
  if (!count) {
    await supabase.from("events").insert(seedEvents);
  }

  const { data: contentRow } = await supabase
    .from("site_content")
    .select("id")
    .eq("id", CONTENT_ROW_ID)
    .maybeSingle();
  if (!contentRow) {
    await supabase.from("site_content").insert(contentToRow(seedSiteContent));
  }
}

export async function subscribeEvents(onChange) {
  const supabase = await getSupabase();

  const refetch = async () => {
    const { data } = await supabase.from("events").select("*");
    onChange(data || []);
  };

  await refetch();
  const channel = supabase
    .channel("events-changes")
    .on("postgres_changes", { event: "*", schema: "public", table: "events" }, refetch)
    .subscribe();

  return () => supabase.removeChannel(channel);
}

export async function subscribeContent(onChange) {
  const supabase = await getSupabase();

  const refetch = async () => {
    const { data } = await supabase
      .from("site_content")
      .select("*")
      .eq("id", CONTENT_ROW_ID)
      .maybeSingle();
    if (data) onChange(rowToContent(data));
  };

  await refetch();
  const channel = supabase
    .channel("site-content-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "site_content" },
      refetch,
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}

export async function addEventRemote(id, event) {
  const supabase = await getSupabase();
  const { error } = await supabase.from("events").insert({ ...event, id });
  if (error) throw error;
}

export async function updateEventRemote(id, patch) {
  const supabase = await getSupabase();
  const { error } = await supabase.from("events").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteEventRemote(id) {
  const supabase = await getSupabase();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw error;
}

export async function voteEventRemote(id) {
  const supabase = await getSupabase();
  const { error } = await supabase.rpc("increment_votes", { event_id: id });
  if (error) throw error;
}

export async function updateContentRemote(next) {
  const supabase = await getSupabase();
  const { error } = await supabase
    .from("site_content")
    .upsert(contentToRow(next));
  if (error) throw error;
}
