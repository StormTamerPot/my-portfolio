---
title: 'ROS를 활용한 로봇 제어 환경 설정'
description: '로봇 운영체제 ROS의 기본 구조를 이해하고 개발 환경을 구성하며 정리한 기록입니다.'
pubDate: 2026-08-24
featured: true
tags: ['ROS', 'Setup', 'Tooling']
---

로봇 제어 코드를 처음 작성하려고 할 때 가장 먼저 마주치는 벽은 알고리즘이 아니라 환경 설정이었습니다. ROS의 구조를 이해하고 개발 환경을 세팅하면서 정리한 내용을 남깁니다.

## ROS의 기본 구성 요소

ROS는 로봇 소프트웨어를 여러 개의 작은 프로그램으로 나누고, 그 사이의 통신을 표준화한 프레임워크입니다.

- **노드(Node)** — 하나의 기능을 담당하는 실행 단위. 카메라 드라이버, 물체 인식기, 모터 제어기가 각각 노드가 됩니다.
- **토픽(Topic)** — 노드 간 단방향 데이터 스트림. 발행(publish)과 구독(subscribe)으로 연결됩니다.
- **서비스(Service)** — 요청과 응답이 한 쌍으로 오가는 동기 통신.
- **액션(Action)** — 오래 걸리는 작업에 대해 중간 진행 상황까지 주고받는 통신.

인식 결과를 제어기로 넘기는 흐름은 대부분 토픽으로 충분했고, "지금 이 자세로 이동해"처럼 완료 여부가 중요한 명령은 액션이 적합했습니다.

## 워크스페이스 구성

ROS 2 기준으로 워크스페이스를 만들고 빌드하는 흐름은 다음과 같습니다.

```bash
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws
colcon build
source install/setup.bash
```

`source` 단계를 빠뜨리면 방금 빌드한 패키지를 찾지 못합니다. 매번 입력하기 번거로워서 셸 설정 파일에 추가해 두었습니다.

```bash
echo "source ~/ros2_ws/install/setup.bash" >> ~/.bashrc
```

## 패키지 만들기

```bash
cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python my_robot_control
```

생성된 패키지의 `setup.py`에 진입점을 등록해야 `ros2 run`으로 노드를 실행할 수 있습니다. 이 부분을 빠뜨려서 노드를 찾지 못하는 오류를 여러 번 겪었습니다.

## 좌표 변환과 TF

로봇에서는 카메라 좌표계, 로봇 베이스 좌표계, 말단장치 좌표계가 각각 따로 존재합니다. ROS의 TF는 이 좌표계 사이의 변환을 시간에 따라 관리해 줍니다.

카메라 좌표계에서 본 점 $p^{cam}$을 베이스 좌표계로 옮기려면 동차 변환 행렬을 곱합니다.

$$
p^{base} = T^{base}_{cam} \, p^{cam}
$$

여기서 변환 행렬은 회전 $R$과 평행이동 $t$로 구성됩니다.

$$
T = \begin{bmatrix} R & t \\ 0 & 1 \end{bmatrix}, \quad R \in SO(3),\; t \in \mathbb{R}^3
$$

카메라 캘리브레이션이 어긋나면 인식은 정확해도 로봇이 엉뚱한 곳으로 움직이기 때문에, TF 설정은 특히 신중하게 확인해야 했습니다.

## 디버깅에 유용했던 명령들

```bash
ros2 node list
ros2 topic list
ros2 topic echo /camera/image_raw
ros2 run tf2_tools view_frames
```

특히 `view_frames`로 좌표계 트리를 그려 보면 어떤 변환이 빠져 있는지 한눈에 확인할 수 있어서 자주 사용했습니다.
