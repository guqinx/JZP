const charMap = {
  // HUI_FINGER
  大: { id: "lh_da", svgFile: "./svgs/lh_da.svg", type: 'HUI_FINGER' },
  食: { id: "lh_shi", svgFile: "./svgs/lh_shi.svg", type: 'HUI_FINGER' },
  中: { id: "lh_zhong", svgFile: "./svgs/lh_zhong.svg", type: 'HUI_FINGER' },
  名: { id: "lh_ming", svgFile: "./svgs/lh_ming.svg", type: 'HUI_FINGER' },
  跪: { id: "lh_gui", svgFile: "./svgs/lh_gui.svg", type: 'HUI_FINGER' },
  散: { id: "lh_san", svgFile: "./svgs/lh_san.svg", type: 'HUI_FINGER' },

  // XIAN_FINGER
  擘: { id: "rh_bo", svgFile: "./svgs/rh_bo.svg", type: 'XIAN_FINGER' },
  托: { id: "rh_tuo", svgFile: "./svgs/rh_tuo.svg", type: 'XIAN_FINGER' },
  抹: { id: "rh_mo", svgFile: "./svgs/rh_mo.svg", type: 'XIAN_FINGER' },
  挑: { id: "rh_tiao", svgFile: "./svgs/rh_tiao.svg", type: 'XIAN_FINGER' },
  勾: { id: "rh_gou", svgFile: "./svgs/rh_gou.svg", type: 'XIAN_FINGER' },
  剔: { id: "rh_ti", svgFile: "./svgs/rh_ti.svg", type: 'XIAN_FINGER' },
  打: { id: "rh_da", svgFile: "./svgs/rh_da.svg", type: 'XIAN_FINGER' },
  摘: { id: "rh_zhai", svgFile: "./svgs/rh_zhai.svg", type: 'XIAN_FINGER' },
  历: { id: "rh_li", svgFile: "./svgs/rh_li.svg", type: 'XIAN_FINGER' },

  蠲: { id: "rh_juan", svgFile: "./svgs/rh_juan.svg", type: 'XIAN_FINGER' },
  轮: { id: "rh_lun", svgFile: "./svgs/rh_lun.svg", type: 'XIAN_FINGER' },
  琐: { id: "rh_suo", svgFile: "./svgs/rh_suo.svg", type: 'XIAN_FINGER' },
  伏: { id: "rh_fu", svgFile: "./svgs/rh_fu.svg", type: 'XIAN_FINGER' },
  滚: { id: "rh_gun", svgFile: "./svgs/rh_gun.svg", type: 'XIAN_FINGER' },
  拂: { id: "rh_fu2", svgFile: "./svgs/rh_fu2.svg", type: 'XIAN_FINGER' },
  至: { id: "rh_zhi", svgFile: "./svgs/rh_zhi.svg", type: 'XIAN_FINGER' },
  拨: { id: "rh_bo2", svgFile: "./svgs/rh_bo2.svg", type: 'XIAN_FINGER' },
  剌: { id: "rh_la", svgFile: "./svgs/rh_la.svg", type: 'XIAN_FINGER' },
  掩: { id: "rh_yan", svgFile: "./svgs/rh_yan.svg", type: 'XIAN_FINGER' },
  如一声: { id: "rh_ruyisheng", svgFile: "./svgs/rh_ruyisheng.svg", type: 'XIAN_FINGER' },
  抹挑: { id: "rh_motiao", svgFile: "./svgs/rh_motiao.svg", type: 'XIAN_FINGER' },
  勾剔: { id: "rh_gouti", svgFile: "./svgs/rh_gouti.svg", type: 'XIAN_FINGER' },
  打摘: { id: "rh_dazhai", svgFile: "./svgs/rh_dazhai.svg", type: 'XIAN_FINGER' },
  托擘: { id: "rh_tuobo", svgFile: "./svgs/rh_tuobo.svg", type: 'XIAN_FINGER' },
  半轮: { id: "rh_banlun", svgFile: "./svgs/rh_banlun.svg", type: 'XIAN_FINGER' },
  长琐: { id: "rh_changsuo", svgFile: "./svgs/rh_changsuo.svg", type: 'XIAN_FINGER' },
  如一: { id: "rh_ruyi", svgFile: "./svgs/rh_ruyi.svg", type: 'XIAN_FINGER' },
  滚拂: { id: "rh_gunfu", svgFile: "./svgs/rh_gunfu.svg", type: 'XIAN_FINGER' },
  全扶: { id: "rh_quanfu", svgFile: "./svgs/rh_quanfu.svg", type: 'XIAN_FINGER' },
  剌伏: { id: "rh_lafu", svgFile: "./svgs/rh_lafu.svg", type: 'XIAN_FINGER' },
  打圆: { id: "rh_dayuan", svgFile: "./svgs/rh_dayuan.svg", type: 'XIAN_FINGER' },
  搯起: { id: "rh_taoqi", svgFile: "./svgs/rh_taoqi.svg", type: 'XIAN_FINGER' },
  抓起: { id: "rh_zhuqi", svgFile: "./svgs/rh_zhuqi.svg", type: 'XIAN_FINGER' },
  带起: { id: "rh_daiqi", svgFile: "./svgs/rh_daiqi.svg", type: 'XIAN_FINGER' },
  虚掩: { id: "rh_xuyan", svgFile: "./svgs/rh_xuyan.svg", type: 'XIAN_FINGER' },
  推出: { id: "rh_tuichu", svgFile: "./svgs/rh_tuichu.svg", type: 'XIAN_FINGER' },
  不动: { id: "rh_budong", svgFile: "./svgs/rh_budong.svg", type: 'XIAN_FINGER' },

  // HUI_NUMBER
  "一徽": { id: "hui_1", svgFile: "./svgs/hui_1.svg", type: 'HUI_NUMBER' },
  "二徽": { id: "hui_2", svgFile: "./svgs/hui_2.svg", type: 'HUI_NUMBER' },
  "三徽": { id: "hui_3", svgFile: "./svgs/hui_3.svg", type: 'HUI_NUMBER' },
  "四徽": { id: "hui_4", svgFile: "./svgs/hui_4.svg", type: 'HUI_NUMBER' },
  "五徽": { id: "hui_5", svgFile: "./svgs/hui_5.svg", type: 'HUI_NUMBER' },
  "六徽": { id: "hui_6", svgFile: "./svgs/hui_6.svg", type: 'HUI_NUMBER' },
  "七徽": { id: "hui_7", svgFile: "./svgs/hui_7.svg", type: 'HUI_NUMBER' },
  "八徽": { id: "hui_8", svgFile: "./svgs/hui_8.svg", type: 'HUI_NUMBER' },
  "九徽": { id: "hui_9", svgFile: "./svgs/hui_9.svg", type: 'HUI_NUMBER' },
  "十徽": { id: "hui_10", svgFile: "./svgs/hui_10.svg", type: 'HUI_NUMBER' },
  "十一徽": { id: "hui_11", svgFile: "./svgs/hui_11.svg", type: 'HUI_NUMBER' },
  "十二徽": { id: "hui_12", svgFile: "./svgs/hui_12.svg", type: 'HUI_NUMBER' },
  "十三徽": { id: "hui_13", svgFile: "./svgs/hui_13.svg", type: 'HUI_NUMBER' },
  "徽外": { id: "hui_wai", svgFile: "./svgs/hui_wai.svg", type: 'HUI_NUMBER' },
 
  // FEN_NUMBER
  "一分": { id: "fen_1", svgFile: "./svgs/fen_1.svg", type: 'FEN_NUMBER' },
  "二分": { id: "fen_2", svgFile: "./svgs/fen_2.svg", type: 'FEN_NUMBER' },
  "三分": { id: "fen_3", svgFile: "./svgs/fen_3.svg", type: 'FEN_NUMBER' },
  "四分": { id: "fen_4", svgFile: "./svgs/fen_4.svg", type: 'FEN_NUMBER' },
  "五分": { id: "fen_5", svgFile: "./svgs/fen_5.svg", type: 'FEN_NUMBER' },
  "六分": { id: "fen_6", svgFile: "./svgs/fen_6.svg", type: 'FEN_NUMBER' },
  "七分": { id: "fen_7", svgFile: "./svgs/fen_7.svg", type: 'FEN_NUMBER' },
  "八分": { id: "fen_8", svgFile: "./svgs/fen_8.svg", type: 'FEN_NUMBER' },
  "九分": { id: "fen_9", svgFile: "./svgs/fen_9.svg", type: 'FEN_NUMBER' },
 
  // XIAN_NUMBER
  "一弦": { id: "xian_1", svgFile: "./svgs/xian_1.svg", type: 'XIAN_NUMBER' },
  "二弦": { id: "xian_2", svgFile: "./svgs/xian_2.svg", type: 'XIAN_NUMBER' },
  "三弦": { id: "xian_3", svgFile: "./svgs/xian_3.svg", type: 'XIAN_NUMBER' },
  "四弦": { id: "xian_4", svgFile: "./svgs/xian_4.svg", type: 'XIAN_NUMBER' },
  "五弦": { id: "xian_5", svgFile: "./svgs/xian_5.svg", type: 'XIAN_NUMBER' },
  "六弦": { id: "xian_6", svgFile: "./svgs/xian_6.svg", type: 'XIAN_NUMBER' },
  "七弦": { id: "xian_7", svgFile: "./svgs/xian_7.svg", type: 'XIAN_NUMBER' },


  // MOVE_FINGER
  进复: { id: "mf_jinfu", svgFile: "./svgs/mf_jinfu.svg", type: 'MOVE_FINGER' },
  退复: { id: "mf_tuifu", svgFile: "./svgs/mf_tuifu.svg", type: 'MOVE_FINGER' },
  往来: { id: "mf_wanglai", svgFile: "./svgs/mf_wanglai.svg", type: 'MOVE_FINGER' },
  上: { id: "mf_shang", svgFile: "./svgs/mf_shang.svg", type: 'MOVE_FINGER' },
  下: { id: "mf_xia", svgFile: "./svgs/mf_xia.svg", type: 'MOVE_FINGER' },
  进: { id: "mf_jin", svgFile: "./svgs/mf_jin.svg", type: 'MOVE_FINGER' },
  退: { id: "mf_tui", svgFile: "./svgs/mf_tui.svg", type: 'MOVE_FINGER' },
  复: { id: "mf_fu", svgFile: "./svgs/mf_fu.svg", type: 'MOVE_FINGER' },
  撞: { id: "mf_zhuang", svgFile: "./svgs/mf_zhuang.svg", type: 'MOVE_FINGER' },
  逗: { id: "mf_dou", svgFile: "./svgs/mf_dou.svg", type: 'MOVE_FINGER' },
  唤: { id: "mf_huan", svgFile: "./svgs/mf_huan.svg", type: 'MOVE_FINGER' },
  吟: { id: "mf_yin", svgFile: "./svgs/mf_yin.svg", type: 'MOVE_FINGER' },
  猱: { id: "mf_nao", svgFile: "./svgs/mf_nao.svg", type: 'MOVE_FINGER' },

  // SPECIAL_FINGER
  注: { id: "sf_zhu", svgFile: "./svgs/sf_zhu.svg", type: 'SPECIAL_FINGER' },
  绰: { id: "sf_chuo", svgFile: "./svgs/sf_chuo.svg", type: 'SPECIAL_FINGER' },

  // BOTH_FINGER
  掐撮三声: { id: "bf_qiazuosansheng", svgFile: "./svgs/bf_qiazuosansheng.svg", type: 'BOTH_FINGER' },
  分开: { id: "bf_fenkai", svgFile: "./svgs/bf_fenkai.svg", type: 'BOTH_FINGER' },
  同声: { id: "bf_tongsheng", svgFile: "./svgs/bf_tongsheng.svg", type: 'BOTH_FINGER' },
  应合: { id: "bf_yinghe", svgFile: "./svgs/bf_yinghe.svg", type: 'BOTH_FINGER' },
  放合: { id: "bf_fanghe", svgFile: "./svgs/bf_fanghe.svg", type: 'BOTH_FINGER' },

  // COMPLEX_FINGER
  掐撮: { id: "cf_qiazuo", svgFile: "./svgs/cf_qiazuo.svg", type: 'COMPLEX_FINGER' },
  双弹: { id: "cf_shuangtan", svgFile: "./svgs/cf_shuangtan.svg", type: 'COMPLEX_FINGER' },
  拨剌: { id: "cf_bola", svgFile: "./svgs/cf_bola.svg", type: 'COMPLEX_FINGER' },
  齐撮: { id: "cf_qizuo", svgFile: "./svgs/cf_qizuo.svg", type: 'COMPLEX_FINGER' },
  撮: { id: "cf_zuo", svgFile: "./svgs/cf_zuo.svg", type: 'COMPLEX_FINGER' },

  // MODIFIER
  引: { id: "mod_yin", svgFile: "./svgs/mod_yin.svg", type: 'MODIFIER' },
  淌: { id: "mod_tang", svgFile: "./svgs/mod_tang.svg", type: 'MODIFIER' },
  急: { id: "mod_ji", svgFile: "./svgs/mod_ji.svg", type: 'MODIFIER' },
  缓: { id: "mod_huan", svgFile: "./svgs/mod_huan.svg", type: 'MODIFIER' },
  紧: { id: "mod_jin", svgFile: "./svgs/mod_jin.svg", type: 'MODIFIER' },
  慢: { id: "mod_man", svgFile: "./svgs/mod_man.svg", type: 'MODIFIER' },

  // MARKER
  从再作: { id: "mark_congzaizuo", svgFile: "./svgs/mark_congzaizuo.svg", type: 'MARKER' },
  从头再作: { id: "mark_congtouzaizuo", svgFile: "./svgs/mark_congtouzaizuo.svg", type: 'MARKER' },
  少息: { id: "mark_shaoxi", svgFile: "./svgs/mark_shaoxi.svg", type: 'MARKER' },
  大息: { id: "mark_daxi", svgFile: "./svgs/mark_daxi.svg", type: 'MARKER' },
  入拍: { id: "mark_rupai", svgFile: "./svgs/mark_rupai.svg", type: 'MARKER' },
  入慢: { id: "mark_ruman", svgFile: "./svgs/mark_ruman.svg", type: 'MARKER' },
  句号: { id: "mark_juhao", svgFile: "./svgs/mark_juhao.svg", type: 'MARKER' },
  再作: { id: "mark_zaizuo", svgFile: "./svgs/mark_zaizuo.svg", type: 'MARKER' },
  曲终: { id: "mark_quzhong", svgFile: "./svgs/mark_quzhong.svg", type: 'MARKER' },
  操终: { id: "mark_caozhong", svgFile: "./svgs/mark_caozhong.svg", type: 'MARKER' },
  泛起: { id: "mark_fanqi", svgFile: "./svgs/mark_fanqi.svg", type: 'MARKER' },
  泛止: { id: "mark_fanzhi", svgFile: "./svgs/mark_fanzhi.svg", type: 'MARKER' },
  间: { id: "mark_jian", svgFile: "./svgs/mark_jian.svg", type: 'MARKER' },
  // 。: { id: "mark_juhao", svgFile: "./svgs/mark_juhao.svg", type: 'MARKER' },

  // 「: { id: "mark_left_quote", svgFile: "./svgs/mark_left_quote.svg", type: 'MARKER' },

};

export default charMap;