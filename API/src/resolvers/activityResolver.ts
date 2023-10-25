import { GQLResolvers, GQLActivity } from "../resolvers-types";

const activity: GQLActivity[] = [
  {
    distance: 10005.1,
    elapsed_time: 3498,
    id: 10090498490,
    start_date: "2023-10-23T14:16:35Z",
    map: {
      summary_polyline:
        "wcepIcm}x@EWEaACyCCc@@q@G{A@sCHuALaANaAHa@Rq@Hy@jAeGXmA~@_FVgARa@LEFD`@r@h@t@~@dBj@rAn@XhC`HZNtAQXAr@K|BQl@SZUBo@y@}DYaAM{@oB_Su@cCAc@Lo@@m@z@oFb@eE`@{CZsDJ_@Fo@ZmBTuBTeBDs@JYfAmHP_AHq@XeBhAsI~@uFj@uD~@kH@sAE_GHgC@eEEkBDc@BEZGVJnBxAt@XdBd@z@\\lCnBjB|AzAtA|@n@zAt@jAf@|CjAfA^t@Fp@Af@I`@QvC_BfB}@RIb@I~@Kh@?h@DjBVbAXBD?NEj@aBrKK`Ab@tAZbFLx@l@hCd@dDPvCNvDJ~@r@|DLjBPlHD|IC~EIdENn@^b@`Ax@bA`AXLx@Nt@TXb@PfCN`Bz@vG`AhIJj@Tt@b@z@Rz@d@jKZtABZBxCD~@`@rG?jAUj@i@n@[j@St@UbBY~CCtCPhJ@xACtAcAjL_@hFI|@CDUDm@CaAMu@QeGiByLcDkF}AcD{@_KuCwA_@{Ai@]QiFyACQ?u@LuDRa@~@kAhBsBRaABCVSbCuAdA_@dAg@`Bq@\\Y?GGi@UiA]uAUo@e@aAg@w@wA_BqLaMkDgDg@[k@Ws@Kg@E}AHyCzAODk@De@Eg@Qk@c@_@c@S_@Wq@Wu@KQM?a@J_@FaBL_DZM?a@[i@cBQa@GC_@UoBwEu@uA{@mAa@u@IEGFYl@c@pBe@x@K`@_@|ByAtH",
    },
    average_cadence: 82.1,
    average_heartrate: 182.7,
  },
  {
    distance: 10005.1,
    elapsed_time: 3498,
    id: 10090498491,
    start_date: "2023-11-23T14:16:35Z",
    map: {
      summary_polyline:
        "wcepIcm}x@EWEaACyCCc@@q@G{A@sCHuALaANaAHa@Rq@Hy@jAeGXmA~@_FVgARa@LEFD`@r@h@t@~@dBj@rAn@XhC`HZNtAQXAr@K|BQl@SZUBo@y@}DYaAM{@oB_Su@cCAc@Lo@@m@z@oFb@eE`@{CZsDJ_@Fo@ZmBTuBTeBDs@JYfAmHP_AHq@XeBhAsI~@uFj@uD~@kH@sAE_GHgC@eEEkBDc@BEZGVJnBxAt@XdBd@z@\\lCnBjB|AzAtA|@n@zAt@jAf@|CjAfA^t@Fp@Af@I`@QvC_BfB}@RIb@I~@Kh@?h@DjBVbAXBD?NEj@aBrKK`Ab@tAZbFLx@l@hCd@dDPvCNvDJ~@r@|DLjBPlHD|IC~EIdENn@^b@`Ax@bA`AXLx@Nt@TXb@PfCN`Bz@vG`AhIJj@Tt@b@z@Rz@d@jKZtABZBxCD~@`@rG?jAUj@i@n@[j@St@UbBY~CCtCPhJ@xACtAcAjL_@hFI|@CDUDm@CaAMu@QeGiByLcDkF}AcD{@_KuCwA_@{Ai@]QiFyACQ?u@LuDRa@~@kAhBsBRaABCVSbCuAdA_@dAg@`Bq@\\Y?GGi@UiA]uAUo@e@aAg@w@wA_BqLaMkDgDg@[k@Ws@Kg@E}AHyCzAODk@De@Eg@Qk@c@_@c@S_@Wq@Wu@KQM?a@J_@FaBL_DZM?a@[i@cBQa@GC_@UoBwEu@uA{@mAa@u@IEGFYl@c@pBe@x@K`@_@|ByAtH",
    },
    average_cadence: 82.1,
    average_heartrate: 182.7,
  },
];

export const activityResolver: GQLResolvers = {
  Query: {
    getActivity: () => activity,
  },
};
