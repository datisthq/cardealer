import json
from pathlib import Path

import pytest
from pydantic import BaseModel, ValidationError

from cardealer import VERSION, Car, Dataset, Dealer, Facility

TESTS = Path(__file__).resolve().parents[3] / "conformance" / "tests"
PACKAGE = Path(__file__).resolve().parents[1]

MODELS: dict[str, type[BaseModel]] = {
    "dataset": Dataset,
    "car": Car,
    "dealer": Dealer,
    "facility": Facility,
}


def collect():
    cases = []
    for directory in sorted(path for path in TESTS.iterdir() if path.is_dir()):
        model = MODELS.get(directory.name)
        for file in sorted(directory.glob("*.json")):
            for group in json.loads(file.read_text("utf-8")):
                for test in group["tests"]:
                    name = f"{directory.name}/{file.name} > {group['description']} > {test['description']}"
                    cases.append(pytest.param(model, test, id=name))
    return cases


def test_every_directory_is_a_known_model():
    unknown = [
        path.name
        for path in TESTS.iterdir()
        if path.is_dir() and path.name not in MODELS
    ]
    assert unknown == []


def test_urls_carry_the_current_version():
    for file in (PACKAGE / "models").glob("*.py"):
        for line in file.read_text("utf-8").splitlines():
            if "datisthq.github.io/cardealer" in line:
                assert f"/{VERSION}/" in line, f"{file.name}: {line.strip()}"


@pytest.mark.parametrize("model,test", collect())
def test_conformance(model, test):
    assert model is not None
    text = json.dumps(test["data"]).replace("{version}", VERSION)
    data = json.loads(text)
    try:
        model.model_validate(data)
        valid = True
    except ValidationError:
        valid = False
    assert valid is test["valid"]
