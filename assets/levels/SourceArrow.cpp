#include <algorithm>
#include <vector>
#include <string>
#include <map>
#include <fstream>
#include <iostream>

using namespace std;
using Level = vector<string>;

const int INF = 1'000'000'000;

const int level_count = 2'000'000;
const int minimum_arrow_count = 2;
const int max_level_per_type = 4;
const int seed = 11;

struct Dist {
	int moveCount;
	int arrowCount;
};

struct Vec2 {
	int x, y;

	Vec2 operator + (const Vec2& v) const {
		return { x + v.x, y + v.y };
	}

	Vec2& operator += (const Vec2& v) {
		return *this = *this + v;
	}

	Vec2 operator - (const Vec2& v) const {
		return { x - v.x, y - v.y };
	}

	Vec2& operator -= (const Vec2& v) {
		return *this = *this - v;
	}

	bool operator != (const Vec2& v) const {
		return x != v.x || y != v.y;
	}
};

auto dirs = { Vec2{ -1, 0 }, Vec2{ 1, 0 }, Vec2{ 0, -1 }, Vec2{ 0, 1 } };

bool isArrow(char c) {
	return c == '<' || c == '>' || c == '^' || c == 'v';
}

Vec2 arrowToDir(char c) {
	if (c == '<') return Vec2{ -1, 0 };
	if (c == '>') return Vec2{ 1, 0 };
	if (c == '^') return Vec2{ 0, -1 };
	return Vec2{ 0, 1 };
}

char invDirToChar(Vec2 dir) {
	if (dir.x == 1) return '<';
	if (dir.x == -1) return '>';
	if (dir.y == 1) return '^';
	return 'v';
}

template<typename T>
struct Grid {
	int height, width;
	vector<vector<T>> data;

	Grid(int height, int width, const T& value) : height(height), width(width) {
		data = vector<vector<T>>(height, vector<T>(width, value));
	}

	T& operator [] (const Vec2& pos) {
		return data[pos.y][pos.x];
	}

	T operator [] (const Vec2& pos) const {
		return data[pos.y][pos.x];
	}

	bool inside(const Vec2& pos) const {
		return data.at(0).size() > pos.x && pos.x >= 0 && data.size() > pos.y && pos.y >= 0;
	}

	bool isSolid(const Vec2& pos) const {
		return !inside(pos) || operator[](pos) == 'W';
	}
};

void spread(const Grid<char>& grid, Grid<Dist>& distance, Vec2 pos, Vec2 dir, int dist, int arrows)
{
	if (grid.isSolid(pos)) return;

	if (isArrow(grid[pos])) {
		arrows++;

		if (grid[pos] != invDirToChar(dir)) return;

		if (distance[pos].moveCount > dist) {
			distance[pos].moveCount = dist;
			distance[pos].arrowCount = arrows;

			for (Vec2 next_dir : dirs) {
				spread(grid, distance, pos + next_dir, next_dir, dist, arrows);
			}
		}
	}
	else {
		if (distance[pos].moveCount > dist) {
			distance[pos].moveCount = dist;
			distance[pos].arrowCount = arrows;

			for (Vec2 next_dir : dirs) {
				if (grid.isSolid(pos - next_dir)) {
					spread(grid, distance, pos + next_dir, next_dir, dist + 1, arrows);
				}
			}
		}

		spread(grid, distance, pos + dir, dir, dist, arrows);
	}
}

bool test(const Grid<char>& grid, const Grid<Dist>& distance, Grid<int>& seen, const Vec2 pos)
{
	if (seen[pos]) return true;
	seen[pos] = true;

	if (distance[pos].moveCount == INF) return false;

	for (Vec2 dir : dirs) {
		Vec2 next = pos;

		while (!grid.isSolid(next + dir)) {
			next += dir;
			if (isArrow(grid[next])) dir = arrowToDir(grid[next]);
		}

		if (!test(grid, distance, seen, next)) return false;
	}

	return true;
}

int minimal_solution(const Grid<char>& grid, Vec2 start, Vec2 finish)
{
	Grid<Dist> distance(grid.height, grid.width, { INF, 0 });
	distance[finish] = { 0, 0 };

	for (Vec2 dir : dirs)
	{
		if (grid.isSolid(finish - dir)) {
			spread(grid, distance, finish + dir, dir, 1, 0);
		}
	}

	Grid<int> seen(grid.height, grid.width, 0);
	if (!test(grid, distance, seen, start)) return -1;

	if (distance[start].arrowCount < minimum_arrow_count) return -1;

	return distance[start].moveCount;
}

pair<Level, int> generate() {
	int arrow_chance = rand() % 11;
	int size = (rand() % 4 + 1) * 5;

	Grid<char> grid(size, size, '.');
	Grid<int> seen(size, size, false);
	Grid<int> path(size, size, false);

	Vec2 start{ rand() % size, rand() % size };
	Vec2 current = start;

	grid[start] = 'S';

	while (true) {
		vector<Vec2> options;
		vector<Vec2> options_dir;

		for (Vec2 dir : dirs)
		{
			Vec2 pos = current + dir;

			while (!grid.isSolid(pos)) {
				if (!seen[pos] && (!grid.inside(pos + dir) || !path[pos + dir]))
				{
					options.push_back(pos);
					options_dir.push_back(dir);
				}

				pos += dir;
			}
		}

		if (options.empty()) break;

		int index = rand() % options.size();
		Vec2 next_pos = options.at(index);
		Vec2 next_dir = options_dir.at(index);

		if (rand() % 10 < arrow_chance) {
			grid[next_pos] = invDirToChar(next_dir);
		}
		else {
			if (grid.inside(next_pos + next_dir)) {
				grid[next_pos + next_dir] = 'W';
			}
		}

		for (Vec2 pos = current; pos != next_pos; pos += next_dir) {
			path[pos] = true;
		}

		for (Vec2 dir : dirs)
		{
			for (Vec2 pos = current; !grid.isSolid(pos); pos += dir)
			{
				seen[pos] = true;
			}
		}

		current = next_pos;
	}

	grid[current] = 'F';

	int path_length = minimal_solution(grid, start, current);

	Level level;

	for (auto line : grid.data) {
		string line_str = "";
		for (char c : line) {
			line_str += c;
		}
		level.push_back(line_str);
	}

	return { level, path_length };
}

int main() {
	srand(seed);

	vector<vector<Level>> levels(400);
	int error_count = 0;

	for (int i = 0; i < level_count; i++) {
		pair<Level, int> result = generate();

		if (result.second == -1)
		{
			error_count++;
		}
		else if (levels.at(result.second).size() < max_level_per_type) {
			levels.at(result.second).push_back(result.first);
		}
	}

	ofstream out("levelsArrow L" + to_string(minimum_arrow_count) + ".json");
	out << "{" << endl;
	out << "\t\"levels\" : [" << endl;

	for (int dist = 0; dist < levels.size(); dist++) {
		if (!levels.at(dist).empty()) {
			out << "\t\t{" << endl;
			out << "\t\t\t\"Difficulty\" : " << dist << "," << endl;

			for (int i = 0; i < levels.at(dist).size(); i++) {
				out << "\t\t\t\"Level " << (i + 1) << "\" : [" << endl;

				for (string line : levels.at(dist).at(i)) {
					out << "\t\t\t\t\"" << line << "\"," << endl;
				}

				out << "\t\t\t]," << endl;
			}

			out << "\t\t}," << endl;
			out << endl;
		}
	}

	out << "\t]" << endl;
	out << "}" << endl;
	out.close();

	cout << "Levels generated: " << level_count << endl;
	cout << "Bad levels: " << error_count << endl;
}
