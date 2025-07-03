const gameSelect = {
  l_p1: true,
  h_p1: true,
  l_p2: true,
  h_p2: true,
  l_p3: true,
  h_p3: true,
  fHitted: true,
  eSport: true,
  soccer: true,
  place: true,
  scheduledAt: true,
  recordedAt: true,
  applied: true,
}

const matchSelect = {
  id: true,
  title: true,
  gread: true,
  sex: true,
  order: true,
  event: true,
  c_1: true,
  c_2: true,
  c_3: true,
  c_4: true,
  c_5: true,
  c_6: true,
  c_7: true,
  p_1: { select: gameSelect },
  p_2: { select: gameSelect },
  p_3: { select: gameSelect },
  p_4: { select: gameSelect },
  p_5: { select: gameSelect },
  p_6: { select: gameSelect },
}

export default matchSelect