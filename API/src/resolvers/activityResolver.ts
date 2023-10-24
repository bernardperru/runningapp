import { GQLResolvers, GQLActivity } from "../resolvers-types";

const activity: GQLActivity = {
  resource_state: 2,
  athlete: {
    id: 92244299,
    resource_state: 1,
  },
  name: "Afternoon Run",
  distance: 10005.1,
  moving_time: 3498,
  elapsed_time: 3498,
  total_elevation_gain: 45,
  type: "Run",
  sport_type: "Run",
  workout_type: null,
  id: 10090498490,
  start_date: "2023-10-23T14:16:35Z",
  start_date_local: "2023-10-23T16:16:35Z",
  timezone: "(GMT+01:00) Europe/Copenhagen",
  utc_offset: 7200,
  location_city: null,
  location_state: null,
  location_country: null,
  achievement_count: 2,
  kudos_count: 0,
  comment_count: 0,
  athlete_count: 1,
  photo_count: 0,
  map: {
    id: "a10090498490",
    summary_polyline:
      "wcepIcm}x@EWEaACyCCc@@q@G{A@sCHuALaANaAHa@Rq@Hy@jAeGXmA~@_FVgARa@LEFD`@r@h@t@~@dBj@rAn@XhC`HZNtAQXAr@K|BQl@SZUBo@y@}DYaAM{@oB_Su@cCAc@Lo@@m@z@oFb@eE`@{CZsDJ_@Fo@ZmBTuBTeBDs@JYfAmHP_AHq@XeBhAsI~@uFj@uD~@kH@sAE_GHgC@eEEkBDc@BEZGVJnBxAt@XdBd@z@\\lCnBjB|AzAtA|@n@zAt@jAf@|CjAfA^t@Fp@Af@I`@QvC_BfB}@RIb@I~@Kh@?h@DjBVbAXBD?NEj@aBrKK`Ab@tAZbFLx@l@hCd@dDPvCNvDJ~@r@|DLjBPlHD|IC~EIdENn@^b@`Ax@bA`AXLx@Nt@TXb@PfCN`Bz@vG`AhIJj@Tt@b@z@Rz@d@jKZtABZBxCD~@`@rG?jAUj@i@n@[j@St@UbBY~CCtCPhJ@xACtAcAjL_@hFI|@CDUDm@CaAMu@QeGiByLcDkF}AcD{@_KuCwA_@{Ai@]QiFyACQ?u@LuDRa@~@kAhBsBRaABCVSbCuAdA_@dAg@`Bq@\\Y?GGi@UiA]uAUo@e@aAg@w@wA_BqLaMkDgDg@[k@Ws@Kg@E}AHyCzAODk@De@Eg@Qk@c@_@c@S_@Wq@Wu@KQM?a@J_@FaBL_DZM?a@[i@cBQa@GC_@UoBwEu@uA{@mAa@u@IEGFYl@c@pBe@x@K`@_@|ByAtH",
    resource_state: 2,
  },
  trainer: false,
  commute: false,
  manual: false,
  private: false,
  visibility: "everyone",
  flagged: false,
  gear_id: null,
  start_latlng: [55.245566200464964, 9.49474305845797],
  end_latlng: [55.24541893042624, 9.499250259250402],
  average_speed: 2.86,
  max_speed: 3.622,
  average_cadence: 82.1,
  has_heartrate: true,
  average_heartrate: 182.7,
  max_heartrate: 194,
  heartrate_opt_out: false,
  display_hide_heartrate_option: true,
  elev_high: 50,
  elev_low: 12.2,
  upload_id: 10809616269,
  upload_id_str: "10809616269",
  external_id: "garmin_ping_301017424819",
  from_accepted_tag: false,
  pr_count: 2,
  total_photo_count: 0,
  has_kudoed: false,
};

export const activityResolver: GQLResolvers = {
  Query: {
    getActivity: () => activity,
  },
};